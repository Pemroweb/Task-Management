import { db } from "./config.js";

export default async function handler(req, res) {
  const collectionName = "tasks";

  try {
    if (req.method === "POST") {
      const payload = req.body;
      const docRef = await db.collection(collectionName).add(payload);
      return res.status(201).json({ id: docRef.id, ...payload });
    }

    if (req.method === "PUT") {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: "Missing ID" });

      await db.collection(collectionName).doc(id).update(updates);
      return res.status(200).json({ success: true });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "Missing ID" });

      await db.collection(collectionName).doc(id).delete();
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
