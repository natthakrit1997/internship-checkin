
"use client";

import { useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function FirebaseTestPage() {
  const [message, setMessage] = useState("พร้อมทดสอบ");

  async function testFirebase() {
    try {
      setMessage("กำลังเชื่อมต่อ...");

      const credential = await signInAnonymously(auth);

      await addDoc(collection(db, "connection_tests"), {
        message: "Firebase connected",
        createdAt: serverTimestamp(),
      });

      setMessage(
        `สำเร็จ! บันทึกข้อมูลแล้ว (UID: ${credential.user.uid})`
      );
    } catch (error) {
      console.error(error);
      setMessage("เชื่อมต่อไม่สำเร็จ กรุณาตรวจสอบ Console และ Rules");
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>ทดสอบ Firebase</h1>
      <p>{message}</p>
      <button onClick={testFirebase}>
        ทดสอบบันทึกข้อมูล
      </button>
    </main>
  );
}