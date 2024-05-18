<template>
    <div class="container">
        <form class="form-horizontal" method="post" @submit.prevent="handleSubmitBuku">
            <div class="form-group">
                <label for="nama-buku">Nama Buku</label>
                <input v-model="formData.NamaBuku" type="text" name="nama-buku" id="nama-buku" class="form-control" required />
            </div>

            <div class="form-group">
                <label for="jenis-buku">Jenis Buku</label>
                <input v-model="formData.JenisBuku" type="text" name="jenis-buku" id="jenis-buku" class="form-control" required />
            </div>

            <div class="form-group">
                <label for="penerbit-buku">Penerbit Buku</label>
                <input v-model="formData.Penerbit" type="text" name="penerbit-buku" id="penerbit-buku"
                    class="form-control" required />
            </div>

            <!-- <div class="form-group">
                <label for="lokasi-buku">Lokasi Buku</label>
                <input v-model="formData.LokasiRak" type="number" name="lokasi-buku" id="lokasi-buku"
                    class="form-control" required />
            </div> -->

            <div class="form-group">
                <label for="nama-buku">Lokasi Buku</label>
                <select v-model="formData.LokasiRak"  name="lokasi-buku" id="lokasi-buku"
                    class="form-control" required>
                    <option>Pilih:</option>
                    <option v-for="item in dataRakInventory" :key="item.id" :value="item.id">
                        {{ item.namaRak }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="stok-buku">Stok Buku</label>
                <input v-model="formData.StokBuku" type="number" name="stok-buku" id="stok-buku" class="form-control" required />
            </div>

            <button type="submit" class="btn btn-primary">Simpan</button>
            <router-link to="/databuku" class="btn btn-success" style="margin-left: 4px;">Data Buku</router-link>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'BukuUi',

    data() {
        return {
            formData: {
                NamaBuku: '',
                JenisBuku: '',
                Penerbit: '',
                LokasiRak: 0,
                StokBuku: 0
            },
            dataRakInventory: []
        };
    },

    created() {
        this.getAllRakInventory()
    },

    methods: {
        async handleSubmitBuku() {
            axios.post('http://localhost:5068/api/buku/createbuku', this.formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                alert('Buku baru disimpan')
            })
        },

        async getAllRakInventory() {
            axios.get('http://localhost:5068/api/inventory/getallinventory').then(res => {
                this.dataRakInventory = res.data
            })
        }
    }
}

</script>