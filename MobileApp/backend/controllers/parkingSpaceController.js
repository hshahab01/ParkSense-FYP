const carOwnerOps = require("../db/carOwnerOps");
const { fb } = require("../db/firebaseConfig")
const fieldValue = require('firebase-admin').firestore.FieldValue;


const getEmptySpaces = async (req, res) => {
  try {
    const { lotid } = req.params;

    const processZoneData = (zoneData) => {
      if (zoneData.exists) {
        const fields = zoneData._fieldsProto;
        return {
          zoneId: zoneData.id,
          emptySpaces: fields.empty ? fields.empty.integerValue : null,
          maxSpaces: fields.max ? fields.max.integerValue : null,
        };
      } else {
        return null;
      }
    };

    const fetchLotInfo = async () => {
      return await carOwnerOps.getLotInfo();
    };

    if (!lotid) {
      const lotsSnapshot = await fb.listCollections();
      const lotInfo = await fetchLotInfo();

      const lotsData = await Promise.all(
        lotsSnapshot.map(async (lotCollection) => {
          const lotId = lotCollection.id.replace('lot_', '');
          const zonesSnapshot = await lotCollection.listDocuments();
          const zonesData = await Promise.all(
            zonesSnapshot.map(async (zoneDoc) => {
              const zoneData = await zoneDoc.get();
              return processZoneData(zoneData);
            })
          );

          const info = lotInfo.find((info) => info.LotID == lotId);
          return info ? { ...info, zones: zonesData.filter((zone) => zone !== null) } : null;
        })
      );

      res.status(200).json(lotsData.filter((lot) => lot !== null));
    } else {
      const lot = "lot_" + lotid;
      const lotRef = fb.collection(lot);
      const zonesSnapshot = await lotRef.listDocuments();
      const lotInfo = await fetchLotInfo();

      const zonesData = await Promise.all(
        zonesSnapshot.map(async (zoneDoc) => {
          const zoneData = await zoneDoc.get();
          return processZoneData(zoneData);
        })
      );

      const info = lotInfo.find((info) => info.LotID == lotid);

      if (info) {
        res.status(200).json({
          ...info,
          zones: zonesData.filter((zone) => zone !== null),
        });
      } else {
        res.status(404).json({ error: `Lot with ID ${lotid} not found` });
      }
    }
  } catch (err) {
    res.status(500).json({ error: `Error executing query: ${err}` });
  }
};


const updateEmptySpaces = async (req, res) => {

    const lot = "lot_" + req.params.lotid
    const zone = "zone_" + req.params.zoneid
    const empty = req.body.empty

    try{
        const doc = fb.collection(lot).doc(zone);

        doc.update({
          empty: empty
        });
        res.status(200).json()
    }
    catch(err){
        res.status(500).json({ error: `Error executing query: ${err}` })
    }
}

const incEmptySpaces = async (req, res) => {

    const lot = "lot_" + req.params.lotid
    const zone = "zone_" + req.params.zoneid

    try{
        const doc = fb.collection(lot).doc(zone);

        await doc.update({
          empty: fieldValue.increment(1)
        });
        res.status(200).json()
    }
    catch(err){
        res.status(500).json({ error: `Error executing query: ${err}` })
    }
}

const decEmptySpaces = async (req, res) => {

    const lot = "lot_" + req.params.lotid
    const zone = "zone_" + req.params.zoneid

    try{
        const doc = fb.collection(lot).doc(zone);
        
        await doc.update({
          empty: fieldValue.increment(-1)
        })

        return res.status(200).json()
    }
    catch(err){
        res.status(500).json({ error: `Error executing query: ${err}` })
    }
}

module.exports = {
    getEmptySpaces,
    updateEmptySpaces,
    incEmptySpaces,
    decEmptySpaces
}
