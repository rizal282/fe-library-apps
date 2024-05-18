<template>
    <div class="container">
        <h1>Form Input Mahasiswa</h1>

        <form class="form-horizontal" method="post" @submit.prevent="handleSubmitMhs">
            <div class="form-group">
                <label>NIM Mahasiswa</label>
                <input v-model="formData.NimMhs" type="text" class="form-control" name="nim-mhs" id="nim-mhs" required />
            </div>
            <div class="form-group">
                <label>Nama Mahasiswa</label>
                <input v-model="formData.NamaMhs" type="text" class="form-control" name="nama-mhs" id="nama-mhs" required />
            </div>
            <div class="form-group">
                <label>Jurusan Mahasiswa</label>
                <input v-model="formData.Jurusan" type="text" class="form-control" name="jurusan-mhs" id="jurusan-mhs" required />
            </div>
            <div class="form-group">
                <input type="checkbox" id="aktif-flag" v-model="formData.AktifFlag" />
                <label for="aktif-flag">Aktif</label>
            </div>
            <button type="submit" class="btn btn-primary">Simpan</button>
            <router-link to="/datamahasiswa" class="btn btn-success" style="margin-left: 4px;">Data Mahasiswa</router-link>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MahasiswaUi',

    data() {
        return {
            formData: {
                NimMhs: '',
                NamaMhs: '',
                Jurusan: '',
                AktifFlag: false
            }
        };
    },
    methods: {
        async handleSubmitMhs() {
            axios.post('http://localhost:5068/api/mahasiswa/createmahasiswa', this.formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                alert('Mahasiswa baru disimpan')
            })
        }
    }
}
</script>