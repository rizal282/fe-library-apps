<template>
    <div class="container">
        <form method="post" class="form-horizontal" @submit.prevent="handleSubmitTrnBuku">
            <div class="form-group">
                <div class="row">
                    <div class="col-lg-8">
                        <label for="no-trn">Nomor Transaksi</label>
                        <input type="text" id="randomInput" class="form-control" v-model="formData.NoTransaksi"
                            readonly>
                    </div>
                    <div style="text-align: right;" class="col-lg-4">
                        <button type="button" class="btn btn-success" @click="handlePinjamBaru">Pinjam Baru</button>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="nama-mhs">Nama Mahasiswa</label>
                <select v-model="formData.IdMhs" name="nama-mhs" id="nama-mhs" class="form-control" required>
                    <option>Pilih:</option>
                    <option v-for="item in itemMhs" :key="item.id" :value="item.id">
                        {{ item.namaMhs }}
                    </option>
                </select>
                <small>Pilihan Mahasiswa diatas adalah Mahasiswa yang masih aktif</small>
            </div>
            <div class="form-group">
                <label for="nama-buku">Nama Buku</label>
                <select v-model="formData.IdBuku" @change="handleChangeBuku" name="nama-buku" id="nama-buku"
                    class="form-control" required>
                    <option>Pilih:</option>
                    <option v-for="item in itemBukus" :key="item.id" :value="item.id">
                        {{ item.namaBuku }}
                    </option>
                </select>
                <small>Pilihan buku diatas adalah yang stoknya masih tersedia</small>
            </div>
            <div class="form-group">
                <label for="jml-buku">Jumlah Buku</label>
                <input v-model="formData.JumlahPinjam" @input="handleChangeJmlBuku" type="number" class="form-control"
                    name="jml-buku" id="jml-buku" required />
            </div>
            <div class="form-group">
                <label for="tgl-pinjam-smp">Tanggal Pinjam</label>
                <input v-model="formData.TglPinjam" @change="handleTglPinjam" type="date" class="form-control" name="tgl-smp-pinjam"
                    id="tgl-smp-pinjam" required />
            </div>

            <div class="form-group">
                <label for="tgl-pinjam-smp">Tanggal Kembali</label>
                <input v-model="formData.TglKembali" @change="handleTglKembali" type="date" class="form-control" name="tgl-smp-pinjam"
                    id="tgl-smp-pinjam" />
            </div>

            <button type="submit" class="btn btn-primary">Simpan</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'


export default {
    name: 'TransaksiUi',

    data() {
        return {
            formData: {
                NoTransaksi: '',
                TglPinjam: '',
                TglKembali: '',
                IdBuku: null,
                IdMhs: null,
                JumlahPinjam: null,
                lamaPinjam: 0,
            },
            itemBukus: [],
            itemMhs: [],
            stokItemBuku: 0,
            lamaPinjamDefault: 14
        }
    },

    created() {
        this.fetchMhsByAktifFlag()
        this.fetchBukuByStok()
    },

    mounted() {
        this.generateNoTrn()
    },

    methods: {
        async handleSubmitTrnBuku() {
            axios.post('http://localhost:5068/api/transaksibuku/createtransaksi', this.formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                alert('Transaksi buku disimpan')
                this.resetForm()
            })
        },

        // mengambil data mahasiswa dengan flag aktif = true
        // sehingga tidak perlu melakukan validasi cek mahasiswa masih aktif / tidak
        async fetchMhsByAktifFlag() {
            axios.get('http://localhost:5068/api/buku/getbukubystok').then(res => {
                this.itemBukus = res.data
            })
        },

        // mengambil data buku yang stoknya masih ada 
        //sehingga tidak perlu melakukan validasi cek stok buku
        async fetchBukuByStok() {
            axios.get('http://localhost:5068/api/mahasiswa/getmhsbyaaktifflag').then(res => {
                this.itemMhs = res.data
            })
        },

        // untuk generate nomor transaksi menggunakan random string
        generateNoTrn() {
            const length = 5;
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            let result = ''

            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length))
            }

            this.formData.NoTransaksi = result
        },

        // untuk generate nomor transaksi baru dengan peminjam yang berbeda
        handlePinjamBaru() {
            this.generateNoTrn()
            this.formData.TglPinjam = null
            this.formData.IdBuku = null
            this.formData.IdMhs = null
            this.formData.JumlahPinjam = null
        },

        // untuk reset beberapa input ketika pinjam buku berhasil disimpan
        // sehingga memungkinkan meminjam lebih dari 1 buku dalam 1 nomor transaksi
        resetForm() {
            this.formData.IdBuku = null
            this.formData.JumlahPinjam = null
        },

        handleChangeBuku() {
            // untuk set stok buku sesuai buku yang dipilih
            const getStokBukuById = this.itemBukus.filter(x => x.id == this.formData.IdBuku)[0].stokBuku
            this.stokItemBuku = getStokBukuById

            console.log(this.stokItemBuku)
        },

        handleChangeJmlBuku() {
            // untuk memvalidasi jika jumlah pinjam > dari stok buku yg akan dipinjam
            const jmlPinjamBuku = this.formData.JumlahPinjam
            const stokBuku = this.stokItemBuku

            if (jmlPinjamBuku > stokBuku) {
                alert('Jumlah pinjam buku lebih dari Stok!')
                this.formData.JumlahPinjam = null
            }

        },

        handleTglPinjam() {
            // jika tanggal kembali tidak di set, maka default 14 hari lama pinjam nya
            const tglKembali = moment(this.formData.TglPinjam, 'YYYY-MM-DD').add(this.lamaPinjamDefault, 'days').format('YYYY-MM-DD')
            this.formData.TglKembali =  tglKembali
            this.formData.lamaPinjam = this.lamaPinjamDefault
            
        },

        handleTglKembali() {
            const lamaPinjam = moment(this.formData.TglKembali, 'YYYY-MM-DD').diff(moment(this.formData.TglPinjam, 'YYYY-MM-DD'), 'days')
            
            this.formData.lamaPinjam = lamaPinjam
        }
    }
}

</script>