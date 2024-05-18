<template>
    <div class="container" >
        <form class="form-horizontal" method="post" @submit.prevent="handleSubmitRakBuku">
            <div class="form-group">
                <label for="nama-buku">Nama Rak</label>
                <input v-model="formData.NamaRak" type="text" name="nama-rak" id="nama-rak" class="form-control" required />
            </div>

            <div class="form-group">
                <label for="jenis-buku">Deskripsi</label>
                <input v-model="formData.Deskripsi" type="text" name="deskripsi" id="deskripsi" class="form-control" required />
            </div>

            <button type="submit" class="btn btn-primary">Simpan</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'RakBukuUi',

    data() {
        return {
            formData: {
                NamaRak: '',
                Deskripsi: ''
            }
        }
    },

    methods: {
        async handleSubmitRakBuku() {
            axios.post('http://localhost:5068/api/inventory/createrakbuku', this.formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res.data)
                alert('Rak Buku baru disimpan!')
            })
        }
    }
}

</script>