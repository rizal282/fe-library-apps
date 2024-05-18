<template>
    <div class="container">
        <table class="table table-stripped">
            <thead>
                <tr>
                    <th v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <td v-for="(column, columnIndex) in columns" :key="columnIndex">{{ item[column.field] }}</td>
                </tr>
                <tr v-if="loading">
                    <td colspan="3">Loading...</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'InquiryTrnUi',
    data() {
        return {
            columns: [
                { label: 'NIM', field: 'nimMhs' },
                { label: 'Nama Peminjam', field: 'namaMhs' },
                { label: 'Nama Buku', field: 'namaBuku' },
                { label: 'ID Buku', field: 'bukuId' },
                { label: 'Tanggal Pinjam', field: 'tglPinjam' },
                { label: 'Tanggal Kembali', field: 'tglKembali' },
                { label: 'Lama Pinjam', field: 'lamaPinjam' }
            ],
            data: [],
            loading: false,
            queryParams: {
                currentPage: 1,
                perPage: 10,
            }
        };
    },
    mounted() {
        this.fetchData()
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async fetchData() {
            this.loading = true

            axios.get("http://localhost:5068/api/transaksibuku/getalltransaksi", {
                params: this.queryParams
            }).then(res => {
                // this.data = res.data;
                this.data = [...this.data, ...res.data];
                this.currentPage++;
            })

            this.loading = false
        },

        handleScroll() {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight &&
                !this.loading
            ) {
                this.fetchData()
            }
        }
    }
};
</script>

<style>
/* Tambahkan styling jika diperlukan */
</style>