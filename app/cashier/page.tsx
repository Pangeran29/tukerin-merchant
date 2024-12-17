"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Coffee,
  Utensils,
  Gift,
  UserPlus,
  Calendar,
  Zap,
  AlertCircle,
  QrCode,
  Send,
  CheckCircle,
  Ticket,
} from "lucide-react";
const listPoints = [
  {
    id: 1,
    name: "Pembelian Kopi",
    points: 45,
    description: "Dapatkan poin untuk setiap pembelian kopi",
    icon: Coffee,
    category: "Transaksi",
    expiryDays: 30,
    color: "bg-amber-100",
  },
  {
    id: 2,
    name: "Pembelian Makanan",
    points: 50,
    description: "Poin tambahan untuk pembelian makanan",
    icon: Utensils,
    category: "Transaksi",
    expiryDays: 30,
    color: "bg-orange-100",
  },
  {
    id: 3,
    name: "Hadiah Referral",
    points: 85,
    description: "Dapatkan poin dengan mengajak teman",
    icon: UserPlus,
    category: "Referral",
    expiryDays: 60,
    color: "bg-blue-100",
  },
  {
    id: 4,
    name: "Paket Makan Siang",
    points: 35,
    description: "Poin ganda untuk menu makan siang",
    icon: Utensils,
    category: "Feedback",
    expiryDays: 30,
    color: "bg-green-100",
  },
  {
    id: 5,
    name: "Ulang Tahun",
    points: 150,
    description: "Bonus poin spesial di hari ulang tahun",
    icon: Gift,
    category: "Spesial",
    expiryDays: 7,
    color: "bg-pink-100",
  },
  {
    id: 6,
    name: "Bonus Loyalitas",
    points: 200,
    description: "Bonus bulanan untuk pelanggan setia",
    icon: Gift,
    category: "Loyalitas",
    expiryDays: 90,
    color: "bg-yellow-100",
  },
  {
    id: 7,
    name: "Review Produk",
    points: 25,
    description: "Berikan review untuk mendapat poin",
    icon: Coffee,
    category: "Feedback",
    expiryDays: 14,
    color: "bg-purple-100",
  },
  {
    id: 8,
    name: "Pembelian Premium",
    points: 100,
    description: "Poin ekstra untuk produk premium",
    icon: Coffee,
    category: "Transaksi",
    expiryDays: 45,
    color: "bg-indigo-100",
  },
  {
    id: 9,
    name: "Event Spesial",
    points: 75,
    description: "Poin tambahan untuk event khusus",
    icon: Calendar,
    category: "Spesial",
    expiryDays: 14,
    color: "bg-red-100",
  },
  {
    id: 10,
    name: "Pembelian Weekend",
    points: 60,
    description: "Bonus poin untuk transaksi di akhir pekan",
    icon: Coffee,
    category: "Transaksi",
    expiryDays: 30,
    color: "bg-teal-100",
  },
  {
    id: 11,
    name: "Membership Baru",
    points: 120,
    description: "Poin selamat datang untuk member baru",
    icon: UserPlus,
    category: "Spesial",
    expiryDays: 30,
    color: "bg-emerald-100",
  },
  {
    id: 12,
    name: "Promo Mingguan",
    points: 40,
    description: "Poin bonus untuk menu promo minggu ini",
    icon: Utensils,
    category: "Transaksi",
    expiryDays: 7,
    color: "bg-cyan-100",
  },
  {
    id: 13,
    name: "Social Media Share",
    points: 30,
    description: "Bagikan pengalaman di sosial media",
    icon: Coffee,
    category: "Feedback",
    expiryDays: 14,
    color: "bg-fuchsia-100",
  },
];

// Mock reward data
const mockReward = {
  title: "Voucher Kopi Gratis",
  image: "/coffee-voucher.svg",
  description: "Nikmati kopi pilihan Anda gratis!",
  points: 100,
  termsAndConditions:
    "Berlaku untuk satu kopi standar. Tidak dapat digabung dengan penawaran lain. Berlaku 30 hari.",
};

const iconComponents = {
  Calendar,
  Zap,
  AlertCircle,
};

const cashierNotes = [
  {
    title: "Tambahan Poin Spesial",
    description:
      "Ingatkan pelanggan bahwa pembelian di atas Rp 100.000 akan mendapat bonus poin 2x lipat",
    icon: "Calendar",
  },
  {
    title: "Promo Bundling",
    description:
      "Tawarkan paket bundling minuman & makanan untuk poin ekstra 50% lebih banyak",
    icon: "Zap",
  },
  {
    title: "Pengingat Kadaluarsa",
    description:
      "Beritahu pelanggan jika poin akan kadaluarsa dalam 7 hari ke depan",
    icon: "AlertCircle",
  },
  {
    title: "Program Referral",
    description:
      "Ingatkan pelanggan bisa dapat 100 poin tambahan untuk setiap teman yang direferensikan",
    icon: "Calendar",
  },
  {
    title: "Happy Hour",
    description:
      "Poin 3x lipat untuk pembelian di jam 14:00-17:00 setiap hari Senin-Jumat",
    icon: "Zap",
  },
  {
    title: "Member Get Member",
    description:
      "Ajak pelanggan bergabung jadi member, dapatkan 150 poin untuk keduanya",
    icon: "AlertCircle",
  },
];

export default function CashierPage() {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    "qr" | "whatsapp" | null
  >(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pointsSent, setPointsSent] = useState(false);
  const [isRedeemingReward, setIsRedeemingReward] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [showRewardDetails, setShowRewardDetails] = useState(false);

  const handlePointSelection = (pointId: number) => {
    setSelectedPoints((prev) =>
      prev.includes(pointId)
        ? prev.filter((id) => id !== pointId)
        : [...prev, pointId],
    );
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setSelectedOption(null);
  };

  const handleOptionSelect = (option: "qr" | "whatsapp") => {
    setSelectedOption(option);
    if (option === "qr") {
      setShowQR(true);
    }
  };

  const handleFinish = () => {
    setSelectedPoints([]);
    setIsProcessing(false);
    setShowQR(false);
    setSelectedOption(null);
    setPhoneNumber("");
    setPointsSent(false);
  };

  const handleSendPoints = () => {
    console.log(`Mengirim ${totalPoints} poin ke ${phoneNumber}`);
    setPointsSent(true);
  };

  const handleRedeemReward = () => {
    setIsRedeemingReward(true);
  };

  const handleSubmitVoucherCode = () => {
    // Here you would typically validate the voucher code
    // For this example, we'll just show the reward details
    setIsRedeemingReward(false);
    setShowRewardDetails(true);
  };

  const totalPoints = selectedPoints.reduce(
    (sum, id) => sum + listPoints.find((item) => item.id === id)!.points,
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-4 flex justify-between sm:mb-8">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Dashboard Kasir
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              Selamat datang di sistem manajemen poin{" "}
              <span className="text-[#b30112]">Sip n Sup</span>
            </p>
          </div>
          <Image
            src="/sipnsup.jpeg?height=200&width=200"
            alt="Banner Sip n Sup"
            width={200}
            height={200}
            className="h-[75px] w-[75px] rounded-md object-cover sm:h-[75px] sm:w-[75px]"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4 sm:text-xl">
            Pilih poin yang akan di klaim
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listPoints.map((item, index) => (
              <Card
                key={index}
                className={`${
                  selectedPoints.includes(item.id)
                    ? "animate-none border-[3px] border-secondary shadow-lg"
                    : "border-[3px] border-gray-300"
                } ${
                  index === 0 ? "animate-border" : ""
                } overflow-hidden bg-white transition-all duration-200 ease-in-out hover:shadow-lg`}
              >
                <CardContent
                  className="cursor-pointer p-6"
                  onClick={() => {
                    handlePointSelection(item.id);
                  }}
                >
                  <div className="mb-4 flex w-full justify-between text-4xl">
                    <h3
                      className={`${
                        selectedPoints.includes(item.id)
                          ? "text-gray-900"
                          : "text-gray-600"
                      } mb-2 text-lg font-semibold`}
                    >
                      {item.name}
                    </h3>
                    <item.icon
                      className={`${
                        selectedPoints.includes(item.id)
                          ? "text-gray-900"
                          : "text-gray-600"
                      } h-6 w-6`}
                    />
                  </div>
                  <p className="mb-4 text-sm text-gray-600">
                    {item.description}
                  </p>
                  <div className="flex flex-col items-start justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Point di dapatkan
                    </span>
                    <span
                      className={`${
                        selectedPoints.includes(item.id)
                          ? "text-gray-900"
                          : "text-gray-600"
                      } text-xl font-bold`}
                    >
                      {item.points} poin
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4 sm:text-xl">
            Catatan untuk kasir
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {cashierNotes.map((card, index) => {
              const IconComponent =
                iconComponents[card.icon as keyof typeof iconComponents];

              return (
                <Card key={index} className="overflow-hidden bg-white">
                  <CardContent className="flex flex-col gap-4 rounded-sm p-4">
                    <h3 className="text-sm font-semibold sm:text-lg">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-600 sm:text-base">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col space-y-2 sm:bottom-8 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Dialog open={isRedeemingReward} onOpenChange={setIsRedeemingReward}>
            <DialogTrigger asChild>
              <Button
                className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 sm:w-auto sm:px-6 sm:py-3 sm:text-lg"
                onClick={handleRedeemReward}
              >
                <Ticket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Tukar Hadiah
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="mb-4 text-center text-xl font-bold sm:text-2xl">
                  Tukar Hadiah
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Label
                  htmlFor="voucherCode"
                  className="mb-2 text-sm font-medium"
                >
                  Masukkan Kode Voucher
                </Label>
                <Input
                  id="voucherCode"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="mb-4"
                  placeholder="contoh: COFFEE123"
                />
                <Button
                  onClick={handleSubmitVoucherCode}
                  className="w-full bg-secondary text-text hover:bg-tertiary"
                >
                  Validasi Kode
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showRewardDetails} onOpenChange={setShowRewardDetails}>
            <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="mb-4 text-center text-xl font-bold sm:text-2xl">
                  Detail Hadiah
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 flex flex-col items-center">
                <div className="relative mb-4 aspect-square w-full max-w-[200px]">
                  <Image
                    src={mockReward.image}
                    alt={mockReward.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold sm:text-xl">
                  {mockReward.title}
                </h3>
                <p className="mb-4 text-center text-sm text-gray-600 sm:text-base">
                  {mockReward.description}
                </p>
                <div className="mb-4 rounded-full bg-secondary px-4 py-2">
                  <span className="text-base font-bold sm:text-lg">
                    {mockReward.points} Poin
                  </span>
                </div>
                <div className="w-full rounded-lg bg-gray-200 p-4">
                  <h4 className="mb-2 text-sm font-semibold sm:text-base">
                    Syarat dan Ketentuan:
                  </h4>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    {mockReward.termsAndConditions}
                  </p>
                </div>
                <Button
                  onClick={() => setShowRewardDetails(false)}
                  className="mt-6 w-full bg-secondary text-text hover:bg-tertiary sm:w-auto"
                >
                  Tutup
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isProcessing} onOpenChange={setIsProcessing}>
            <DialogTrigger asChild>
              <Button
                className="flex w-full gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 sm:w-auto sm:px-6 sm:py-3 sm:text-lg"
                disabled={selectedPoints.length === 0}
                onClick={handleProcess}
              >
                <span>Proses</span>
                <span>{selectedPoints.length}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[425px]">
              {!selectedOption && (
                <>
                  <DialogHeader>
                    <DialogTitle className="mb-4 text-center text-xl font-bold sm:text-2xl">
                      Proses Poin
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <div className="mb-6 rounded-lg bg-secondary p-4">
                      <p className="text-center text-base font-semibold sm:text-lg">
                        Total Poin untuk Diproses
                      </p>
                      <p className="text-center text-2xl font-bold sm:text-4xl">
                        {totalPoints}
                      </p>
                    </div>
                    <p className="mb-6 text-center text-sm sm:text-base">
                      Bagus! Anda akan memberikan hadiah kepada pelanggan.
                      Bagaimana cara Anda ingin mengirim poin?
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        onClick={() => handleOptionSelect("qr")}
                        className="flex items-center border-2 border-secondary bg-white text-text hover:bg-secondary/10"
                      >
                        <QrCode className="h-6 w-6 sm:h-8 sm:w-8" />
                        <span className="text-xs sm:text-sm">Buat QR</span>
                      </Button>
                      <Button
                        onClick={() => handleOptionSelect("whatsapp")}
                        className="flex items-center border-2 border-secondary bg-white text-text hover:bg-secondary/10"
                      >
                        <Send className="h-6 w-6 sm:h-8 sm:w-8" />
                        <span className="text-xs sm:text-sm">
                          Kirim ke WhatsApp
                        </span>
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {selectedOption === "qr" && showQR && (
                <div className="flex h-full flex-col items-center justify-center">
                  <Image
                    src="/qr.svg"
                    alt="Kode QR"
                    width={200}
                    height={200}
                    className="mb-4"
                  />
                  <p className="mb-4 text-center text-sm sm:text-base">
                    Pindai kode QR ini untuk menambahkan poin ke akun pelanggan
                  </p>
                  <Button
                    onClick={handleFinish}
                    className="bg-secondary text-text hover:bg-tertiary"
                  >
                    <CheckCircle className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
                    Selesai
                  </Button>
                </div>
              )}
              {selectedOption === "whatsapp" && (
                <div className="flex h-full flex-col items-center justify-center">
                  <Send className="mb-4 h-12 w-12 text-secondary sm:h-16 sm:w-16" />
                  <h3 className="mb-4 text-lg font-semibold sm:text-xl">
                    Kirim Poin via WhatsApp
                  </h3>
                  <Label htmlFor="phone" className="mb-2 text-sm font-medium">
                    Nomor Telepon Pelanggan
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Masukkan nomor telepon"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mb-4"
                  />
                  <div className="flex w-full justify-center">
                    {!pointsSent ? (
                      <Button
                        onClick={handleSendPoints}
                        className="mb-2 bg-secondary text-text hover:bg-tertiary"
                        disabled={!phoneNumber}
                      >
                        <Send className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
                        Kirim Poin
                      </Button>
                    ) : (
                      <div className="mt-4 text-center">
                        <CheckCircle className="mx-auto mb-2 h-6 w-6 text-green-500 sm:h-8 sm:w-8" />
                        <p className="text-sm font-semibold text-green-600 sm:text-base">
                          Poin berhasil dikirim!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
