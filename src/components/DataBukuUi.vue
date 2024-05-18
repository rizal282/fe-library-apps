<template>
    <div class="container" >
        <h2>Master Data Buku</h2>
        <table class="table table-stripped">
            <thead>
                <tr>
                    <th v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in dataBuku" :key="index">
                    <td v-for="(column, columnIndex) in columns" :key="columnIndex">{{ item[column.field] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'DataBukuUi',

    data() {
        return {
            columns: [
                { label: 'Nama Buku', field: 'namaBuku' },
                { label: 'Jenis', field: 'jenisBuku' },
                { label: 'Penerbit', field: 'penerbit' },
                { label: 'Stok', field: 'stokBuku' },
                { label: 'Lokasi', field: 'lokasiBuku' }
            ],
            dataBuku: []
        }
    },

    mounted() {
        this.getAllBuku();
    },

    methods: {
        async getAllBuku() {
            axios.get('http://localhost:5068/api/buku/getallbuku').then(res => {
                this.dataBuku = res.data
            })
        }
    }
}

</script>