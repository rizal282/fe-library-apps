<template>
    <div class="container" >
        <h2>Master Data Mahasiswa</h2>
        <table class="table table-stripped">
            <thead>
                <tr>
                    <th v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in dataMhs" :key="index">
                    <td v-for="(column, columnIndex) in columns" :key="columnIndex">{{ item[column.field] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'DataMahasiswaUi',

    data() {
        return {
            columns: [
                { label: 'NIM', field: 'nimMhs' },
                { label: 'Nama Mahasiswa', field: 'namaMhs' },
                { label: 'Jurusan', field: 'jurusan' },
                { label: 'Status', field: 'stsAktif' }
            ],
            dataMhs: []
        }
    },

    mounted() {
        this.getAllMahasiswa()
    },

    methods: {
        async getAllMahasiswa() {
            axios.get('http://localhost:5068/api/mahasiswa/getallmahasiswa').then(res => {
                this.dataMhs = res.data
            })
        }
    }
}

</script>