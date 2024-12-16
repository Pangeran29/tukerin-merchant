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

// Enhanced mock data for point catalogue
const pointCatalogue = [
  {
    id: 1,
    name: "Pembelian Kopi",
    points: 50,
    description: "Dapatkan poin untuk setiap pembelian kopi",
    icon: Coffee,
    category: "Minuman",
    expiryDays: 30,
    color: "bg-amber-100",
  },
  {
    id: 2,
    name: "Paket Makan Siang",
    points: 100,
    description: "Poin ganda untuk menu makan siang",
    icon: Utensils,
    category: "Makanan",
    expiryDays: 14,
    color: "bg-green-100",
  },
  {
    id: 3,
    name: "Bonus Loyalitas",
    points: 200,
    description: "Bonus bulanan untuk pelanggan setia",
    icon: Gift,
    category: "Hadiah",
    expiryDays: 60,
    color: "bg-purple-100",
  },
  {
    id: 4,
    name: "Hadiah Referral",
    points: 150,
    description: "Poin untuk mereferensikan pelanggan baru",
    icon: UserPlus,
    category: "Referral",
    expiryDays: 90,
    color: "bg-blue-100",
  },
];

const pointTypes = [
  {
    id: 1,
    icon: "🛍️",
    name: "Poin Pembelian",
    description: "Dapatkan poin untuk setiap pembelian",
    points: 45,
  },
  {
    id: 2,
    icon: "🎂",
    name: "Bonus Ulang Tahun",
    description: "Poin spesial di hari ulang tahun Anda",
    points: 125,
  },
  {
    id: 3,
    icon: "👥",
    name: "Hadiah Referral",
    description: "Dapatkan poin dengan mengajak teman",
    points: 85,
  },
  {
    id: 4,
    icon: "📝",
    name: "Poin Ulasan",
    description: "Dapatkan poin untuk memberikan ulasan",
    points: 35,
  },
  {
    id: 5,
    icon: "📅",
    name: "Bonus Check-in",
    description: "Dapatkan poin untuk kunjungan rutin",
    points: 45,
  },
  {
    id: 6,
    icon: "🏆",
    name: "Pencapaian Loyalitas",
    description: "Bonus poin untuk pelanggan setia",
    points: 200,
  },
  {
    id: 7,
    icon: "📱",
    name: "Unduh Aplikasi",
    description: "Poin sekali untuk mengunduh aplikasi",
    points: 75,
  },
  {
    id: 8,
    icon: "🎉",
    name: "Acara Khusus",
    description: "Event poin bonus waktu terbatas",
    points: 150,
  },
];

// Mock reward data
const mockReward = {
  title: "Voucher Kopi Gratis",
  image: "/placeholder.svg?height=200&width=200",
  description: "Nikmati kopi pilihan Anda gratis!",
  points: 100,
  termsAndConditions:
    "Berlaku untuk satu kopi standar. Tidak dapat digabung dengan penawaran lain. Berlaku 30 hari.",
};

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
    (sum, id) => sum + pointTypes.find((item) => item.id === id)!.points,
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-4 sm:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-4xl">
            Dashboard Kasir
          </h1>
          <p className="text-base text-gray-600 sm:text-xl">
            Selamat datang di sistem manajemen poin Sip n Sup
          </p>
        </div>

        <div className="relative mb-6 w-full overflow-hidden rounded-lg shadow-lg sm:mb-12">
          <Image
            src="/sipnsup.jpeg?height=400&width=1200"
            alt="Banner Sip n Sup"
            width={1200}
            height={400}
            className="h-[150px] w-full object-cover sm:h-[300px]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center text-white">
              <h2 className="mb-1 text-xl font-bold sm:mb-2 sm:text-3xl">
                Berikan Hadiah ke Pelanggan
              </h2>
              <p className="text-sm sm:text-xl">
                Bangun loyalitas dengan sistem poin kami
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-white p-4 shadow-md sm:mb-8 sm:p-6">
          <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:mb-4 sm:text-2xl">
            Ikhtisar Sistem Poin
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="flex items-center">
              <Calendar className="mr-3 h-6 w-6 text-[#FDDF23] sm:mr-36 sm:h-8 sm:w-8" />
              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  Hadiah Harian
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Dorong kunjungan harian
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Zap className="mr-3 h-6 w-6 text-[#FDDF23] sm:mr-6 sm:h-8 sm:w-8" />
              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  Penukaran Instan
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Penggunaan poin cepat dan mudah
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <AlertCircle className="mr-3 h-6 w-6 text-[#FDDF23] sm:mr-6 sm:h-8 sm:w-8" />
              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  Pengingat Kadaluarsa
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Beritahu pelanggan sebelum poin kadaluarsa
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="mb-3 text-xl font-semibold text-gray-900 sm:mb-4 sm:text-2xl">
            Katalog Poin Tersedia
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pointTypes.map((item, index) => (
              <Card
                key={index}
                className={`${
                  selectedPoints.includes(item.id)
                    ? "border-primary bg-gray-200"
                    : `border-gray-200`
                } overflow-hidden transition-all duration-200 ease-in-out hover:shadow-lg`}
              >
                <CardContent
                  className="cursor-pointer p-6"
                  onClick={() => {
                    handlePointSelection(item.id);
                  }}
                >
                  <div className="mb-4 flex w-full justify-between text-4xl">
                    <span>{item.icon}</span>
                    <Checkbox
                      checked={selectedPoints.includes(item.id)}
                      onCheckedChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {item.description}
                  </p>
                  <div className="flex flex-col items-start justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Dapatkan hingga
                    </span>
                    <span className="text-xl font-bold text-gray-600">
                      {item.points} poin
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 right-4 z-10 flex flex-col space-y-2 sm:bottom-8 sm:left-auto sm:flex-row sm:space-x-4 sm:space-y-0">
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
              <Label htmlFor="voucherCode" className="mb-2 text-sm font-medium">
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
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
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
              <div className="mb-4 rounded-full bg-secondary p-2">
                <span className="text-base font-bold sm:text-lg">
                  {mockReward.points} Poin
                </span>
              </div>
              <div className="w-full rounded-lg bg-gray-100 p-4">
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
              className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 sm:w-auto sm:px-6 sm:py-3 sm:text-lg"
              disabled={selectedPoints.length === 0}
              onClick={handleProcess}
            >
              Proses {selectedPoints.length}
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
                    <div className="mb-4 text-center">
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
  );
}
