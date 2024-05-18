import { createRouter, createWebHistory } from 'vue-router'
import MahasiswaUi from '@/components/MahasiswaUi.vue'
import BukuUi from '@/components/BukuUi.vue'
import TransaksiUi from '@/components/TransaksiUi.vue'
import InquiryTrnUi from '@/components/InquiryTrnUi.vue'
import DataMahasiswaUi from '@/components/DataMahasiswaUi.vue'
import DataBukuUi from '@/components/DataBukuUi.vue'
import RakBukuUi from '@/components/RakBukuUi.vue'

const routes = [
    {
      path: '/',
      name: 'Mahasiswa',
      component: MahasiswaUi,
    },
    {
      path: '/Buku',
      name: 'Buku',
      component: BukuUi,
    },
    {
      path: '/transaksibuku',
      name: 'TransaksiBuku',
      component: TransaksiUi,
    },
    {
      path: '/inquirybuku',
      name: 'InquiryBuku',
      component: InquiryTrnUi,
    },
    {
      path: '/datamahasiswa',
      name: 'DataMahasiswa',
      component: DataMahasiswaUi,
    },
    {
      path: '/databuku',
      name: 'DataBuku',
      component: DataBukuUi,
    },
    {
      path: '/rakbuku',
      name: 'RakBuku',
      component: RakBukuUi,
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
  export default router;