<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Library Apps</a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><router-link to="/" class="nav-link">Mahasiswa</router-link></li>
                    <li><router-link to="/buku" class="nav-link">Buku</router-link></li>
                    <li><router-link to="/rakbuku" class="nav-link">Rak Buku</router-link></li>
                    <li><router-link to="/transaksibuku" class="nav-link">Transaksi</router-link></li>
                    <li><router-link to="/inquirybuku" class="nav-link">Inquiry</router-link></li>
                </ul>
                <!-- <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                </ul> -->
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavbarUi',
};
</script>