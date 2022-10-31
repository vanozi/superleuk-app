<script setup>
const toggleMobileMenu = function () {
  document.getElementById('hamburger-icon').classList.toggle('open')
}
</script>

<template>
  <header>
    <div id="brand">
      <a href="/">Superleuk</a>
    </div>
    <nav>
      <ul>
        <li><a href="/werkplaats">Werkplaats</a></li>
        <li><a href="/products">Loonwerk</a></li>
        <!-- <li><a href="/about">About</a></li>
        <li id="login">
          <a href="/login">Login</a>
        </li>
        <li id="signup">
          <a href="/signup">Signup</a>
        </li>
      </ul> -->
      </ul>
    </nav>
    <div id="hamburger-icon" @click="toggleMobileMenu()">
      <div class="bar1" />
      <div class="bar2" />
      <div class="bar3" />
      <ul class="mobile-menu">
        <li><a href="/home">Werkplaats</a></li>
        <li><a href="/products">Loonwerk</a></li>
        <!-- <li><a href="/about">About</a></li>
        <li id="login">
          <a href="/login">Login</a>
        </li>
        <li id="signup">
          <a href="/signup">Signup</a>
        </li> -->
      </ul>
    </div>
  </header>
</template>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"); */

header a {
  text-decoration: none;
}

header {
  padding: 0 20px;
  background-color: #1d1f1d;
  height: 50px;
  display: flex;
  justify-content: space-between;
}

#brand {
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
}

#brand a {
  color: #09c372;
}

header ul {
  list-style: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

header ul a {
  color: white;
}

header ul li {
  padding: 5px;
  margin-left: 10px;
}

header ul li:hover a {
  /* transform: scale(1.1);
  transition: 0.3s; */
  color: #09c372;
}

#login,
#signup {
  border-radius: 5px;
  padding: 5px 8px;
}

#login {
  border: 1px solid #498afb;
}

#signup {
  border: 1px solid #ff3860;
}

#signup a {
  color: #ff3860;
}

#login a {
  color: #498afb;
}

#hamburger-icon {
  margin: auto 0;
  display: none;
  cursor: pointer;
}

#hamburger-icon div {
  width: 35px;
  height: 3px;
  background-color: white;
  margin: 6px 0;
  transition: 0.4s;
}

header .open .bar1 {
  -webkit-transform: rotate(-45deg) translate(-6px, 6px);
  transform: rotate(-45deg) translate(-6px, 6px);
}

header .open .bar2 {
  opacity: 0;
}

header .open .bar3 {
  -webkit-transform: rotate(45deg) translate(-6px, -8px);
  transform: rotate(45deg) translate(-6px, -8px);
}

header .open .mobile-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

header .mobile-menu {
  background-color: #353836;
  display: none;
  position: absolute;
  top: 50px;
  left: 0;
  height: calc(100vh - 50px);
  width: 100%;
  z-index: 999999;
}

header .mobile-menu li {
  margin-top: 10px;
}

@media only screen and (max-width: 600px) {
  header nav {
    display: none;
  }

  #hamburger-icon {
    display: block;
  }
}
</style>
