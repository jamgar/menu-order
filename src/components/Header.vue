<template>
  <b-navbar toggleable="md" class="bg-white">


    <b-navbar-brand to="/">Starving Dev Menu App</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/menu">Menu</b-nav-item>
        <b-nav-item to="/about">MyOrders</b-nav-item>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .navbar-light .navbar-nav .nav-link.active,
  .navbar-light .navbar-brand {
    color: #41B883 !important;
    font-weight: bolder;
  }
  .navbar-light .navbar-nav .nav-link {
    color: rgba(65,184,131,1);
  }
  .navbar-light .navbar-nav .nav-link:hover,
  .navbar-light .navbar-brand:hover {
    color: rgba(65,184,131,.5);
  }
</style>
