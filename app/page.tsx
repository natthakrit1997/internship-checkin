
"use client";

import { useEffect, useState } from "react";

type Tab = "home" | "summary" | "profile";

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("home");
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const timeText = (value: string | null) => value ?? "--:--";

  const hoursWorked = () => {
    if (!checkIn || !checkOut) return "0.00";
    const minutes =
      (new Date(`2000-01-01T${checkOut}:00`).getTime() -
        new Date(`2000-01-01T${checkIn}:00`).getTime()) /
      60000;
    return Math.max(0, minutes / 60).toFixed(2);
  };

  function recordTime() {
    if (!checkIn) {
      setCheckIn(now?.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }) ?? "--:--");
    } else if (!checkOut) {
      setCheckOut(now?.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }) ?? "--:--");
    }
  }

  const dateText = now
    ? now.toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "กำลังโหลดวันที่...";

  const actionLabel = !checkIn
    ? "📸 ถ่ายรูปเข้างาน"
    : !checkOut
      ? "📸 ถ่ายรูปออกงาน"
      : "✅ ลงเวลาครบแล้ว";

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 sm:flex sm:justify-center sm:py-6">
      <div className="relative flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-gray-50 shadow-xl sm:min-h-[812px] sm:rounded-[2rem]">
        <header className="rounded-b-[2rem] bg-gradient-to-br from-purple-800 to-fuchsia-500 px-6 pb-16 pt-10 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">
                สถาบันการอาชีวศึกษาภาคกลาง 4
              </p>
              <h1 className="mt-2 text-2xl font-bold">สวัสดี, เซฟ 👋</h1>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/20 text-2xl">
              👨🏻‍🎓
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-4 text-gray-800 shadow-lg">
            <div>
              <p className="text-xs text-gray-500">วันที่</p>
              <p className="mt-1 text-sm font-semibold">{dateText}</p>
            </div>
            <div className="border-l border-gray-200 pl-4 text-right">
              <p className="text-xs text-gray-500">เวลาปัจจุบัน</p>
              <p className="text-2xl font-extrabold text-purple-700">
                {now
                  ? now.toLocaleTimeString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })
                  : "--:--:--"}
              </p>
            </div>
          </div>
        </header>

        <section className="flex-1 space-y-5 overflow-y-auto px-5 pb-28 pt-6">
          {tab === "home" && (
            <>
              <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
                <p className="font-semibold">🟢 พร้อมลงเวลา</p>
                <p className="mt-1 text-sm text-gray-500">
                  📍 วิทยาลัยอาชีวศึกษานครปฐม
                </p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-purple-700 to-fuchsia-500 p-6 text-center text-white shadow-lg">
                <div className="text-5xl">📷</div>
                <h2 className="mt-3 text-xl font-bold">{actionLabel}</h2>
                <p className="mt-2 text-sm opacity-90">
                  {checkOut
                    ? "บันทึกเวลาในตัวอย่างครบแล้ว"
                    : "กดปุ่มเพื่อทดลองบันทึกเวลา"}
                </p>
                <button
                  onClick={recordTime}
                  disabled={Boolean(checkOut)}
                  className="mt-5 w-full rounded-2xl bg-white px-5 py-4 font-bold text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {checkOut
                    ? "ลงเวลาครบแล้ว"
                    : !checkIn
                      ? "ทดลองเช็กชื่อเข้างาน"
                      : "ทดลองเช็กชื่อออกงาน"}
                </button>
                <p className="mt-3 text-xs opacity-80">
                  * ตอนนี้เป็นข้อมูลทดลอง ยังไม่ใช้กล้องจริง
                </p>
              </div>

              <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold">📋 สรุปเวลาวันนี้</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-emerald-50 p-4 text-center">
                    <p className="text-xs text-gray-500">เวลาเข้างาน</p>
                    <p className="mt-1 text-xl font-bold text-emerald-700">
                      {timeText(checkIn)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-orange-50 p-4 text-center">
                    <p className="text-xs text-gray-500">เวลาออกงาน</p>
                    <p className="mt-1 text-xl font-bold text-orange-600">
                      {timeText(checkOut)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 rounded-xl bg-purple-50 p-4 text-center">
                  <p className="text-sm text-gray-500">ชั่วโมงที่คำนวณได้</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {hoursWorked()} ชั่วโมง
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-purple-200 bg-white p-5 text-center">
                <p className="font-semibold">🕘 ประวัติการลงเวลาวันนี้</p>
                {!checkIn ? (
                  <p className="mt-2 text-sm text-gray-400">
                    ยังไม่มีประวัติในวันนี้
                  </p>
                ) : (
                  <div className="mt-3 space-y-2 text-sm">
                    <p>เข้างาน: {checkIn} น.</p>
                    {checkOut && <p>ออกงาน: {checkOut} น.</p>}
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "summary" && (
            <>
              <h2 className="text-xl font-bold">สรุปเวลาฝึกงาน</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <p className="text-sm text-gray-500">วันที่ลงเวลา</p>
                  <p className="mt-2 text-3xl font-bold text-purple-700">
                    {checkIn ? "1" : "0"}
                  </p>
                  <p className="text-xs text-gray-400">วัน (ข้อมูลทดลอง)</p>
                </div>
                <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <p className="text-sm text-gray-500">ชั่วโมงรวม</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-600">
                    {hoursWorked()}
                  </p>
                  <p className="text-xs text-gray-400">ชั่วโมง</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="font-bold">สถานะวันนี้</h3>
                <p className="mt-3 text-sm">
                  เข้างาน: {timeText(checkIn)}
                </p>
                <p className="mt-2 text-sm">
                  ออกงาน: {timeText(checkOut)}
                </p>
                <p className="mt-3 text-xs text-gray-400">
                  ข้อมูลนี้ใช้ทดสอบหน้าจอเท่านั้น
                </p>
              </div>
            </>
          )}

          {tab === "profile" && (
            <>
              <h2 className="text-xl font-bold">ข้อมูลนักศึกษา</h2>
              <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-4xl">
                  👨🏻‍🎓
                </div>
                <h3 className="mt-4 text-lg font-bold">นายเซฟ (ตัวอย่าง)</h3>
                <p className="mt-1 text-sm text-gray-500">
                  รหัสนักศึกษา: 6630204001
                </p>
                <p className="mt-3 inline-block rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
                  ระดับ ปวส. / ปริญญาตรี
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">สถานศึกษา</p>
                <p className="mt-1 font-semibold">
                  วิทยาลัยอาชีวศึกษานครปฐม
                </p>
                <p className="mt-4 text-sm text-gray-500">ครูที่ปรึกษา</p>
                <p className="mt-1 font-semibold">
                  ครูณัฐกฤษฏ์ จันทร์รุ่งเรือง
                </p>
              </div>
            </>
          )}
        </section>

        <nav className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-gray-200 bg-white px-3 pb-4 pt-3">
          <button
            onClick={() => setTab("home")}
            className={`rounded-xl py-2 text-sm ${tab === "home" ? "font-bold text-purple-700" : "text-gray-400"}`}
          >
            🏠<span className="mt-1 block">หน้าหลัก</span>
          </button>
          <button
            onClick={() => setTab("summary")}
            className={`rounded-xl py-2 text-sm ${tab === "summary" ? "font-bold text-purple-700" : "text-gray-400"}`}
          >
            📊<span className="mt-1 block">สรุปเวลา</span>
          </button>
          <button
            onClick={() => setTab("profile")}
            className={`rounded-xl py-2 text-sm ${tab === "profile" ? "font-bold text-purple-700" : "text-gray-400"}`}
          >
            👤<span className="mt-1 block">โปรไฟล์</span>
          </button>
        </nav>
      </div>
    </main>
  );
}