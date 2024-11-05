import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Buku } from '../models/Buku';
import apiResponse from '../utils/apiResponse';

// Menambahkan Buku
export const TambahBuku: RequestHandler = async (Req: Request, Res: Response, next: NextFunction): Promise<void> => {
    const { judul, deskripsi, tersedia, pengarang, harga } = Req.body;

    try {
        // Validasi input
        if (!judul || !harga) {
             Res.status(400).json(apiResponse(false, 'Judul dan Harga wajib diisi'));
        }

        const kodeacakbuku = Math.floor(Math.random() * 700);
        const buku = new Buku({
            kodebuku: kodeacakbuku,
            judul,
            deskripsi,
            tersedia,
            pengarang,
            harga,
        });

        const savedBuku = await buku.save();
        Res.status(200).json(apiResponse(true, 'Buku Berhasil Di Tambahkan', { buku: savedBuku }));

    } catch (error) {
        next(error);
    }
};

// Mengambil semua Buku
export const dataBuku: RequestHandler = async (Req: Request, Res: Response, next: NextFunction): Promise<void> => {
    try {
        const buku = await Buku.find();
        Res.status(200).json(apiResponse(true, 'Data Buku Tersedia', { buku }));
    } catch (error) {
        next(error);
    }
};

// Mengambil detail Buku berdasarkan kodebuku
export const detailBuku: RequestHandler = async (Req: Request, Res: Response, next: NextFunction): Promise<void> => {
    const { kodebuku } = Req.params;

    try {
        const detail = await Buku.findOne({ kodebuku });
        if (!detail) {
             Res.status(404).json(apiResponse(false, 'Data Buku Tidak Ditemukan'));
        }
        Res.status(200).json(apiResponse(true, 'Detail Data Berhasil', { detail }));
    } catch (error) {
        next(error);
    }
};

// Menghapus Buku berdasarkan ID
export const deleteBuku: RequestHandler = async (Req: Request, Res: Response, next: NextFunction): Promise<void> => {
    const { id } = Req.params;

    try {
        const buku = await Buku.findByIdAndDelete(id);
        if (!buku) {
             Res.status(404).json(apiResponse(false, 'Buku Tidak Ditemukan'));
        }
        Res.status(200).json(apiResponse(true, 'Buku Berhasil Di Hapus', { buku }));
    } catch (error) {
        next(error);
    }
};

// Memperbarui Buku berdasarkan ID
export const updateBuku: RequestHandler = async (Req: Request, Res: Response, next: NextFunction): Promise<void> => {
    const { id } = Req.params;

    try {
        const update = await Buku.findByIdAndUpdate(id, Req.body, { new: true });
        if (!update) {
             Res.status(404).json(apiResponse(false, 'Buku Tidak Ditemukan'));
        }
        Res.status(200).json(apiResponse(true, 'Data Berhasil Di Update', { update }));
    } catch (error) {
        next(error);
    }
};
