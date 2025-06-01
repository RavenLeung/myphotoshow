<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const screenWidth = ref(window.innerWidth)

const handleResize = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="app-container">
    <header class="header">
      <nav class="nav-container">
        <div class="season-nav left">
          <RouterLink to="/gallery?season=spring" class="season-link chinese-text">春</RouterLink>
          <RouterLink to="/gallery?season=summer" class="season-link chinese-text">夏</RouterLink>
        </div>

        <RouterLink to="/" class="logo">
          <span class="logo-text">RAVEN LEUNG</span>
        </RouterLink>

        <div class="season-nav right">
          <RouterLink to="/gallery?season=autumn" class="season-link chinese-text">秋</RouterLink>
          <RouterLink to="/gallery?season=winter" class="season-link chinese-text">冬</RouterLink>
        </div>

        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen" :class="{ 'is-active': isMenuOpen }">
          <span></span>
          <span></span>
        </button>

        <div class="nav-links">
          <RouterLink to="/about" @click="isMenuOpen = false">ABOUT</RouterLink>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer class="footer">
      <p>&copy; 2024 摄影作品展示</p>
    </footer>
  </div>
</template>

<style lang="scss">
@use './assets/styles/global.scss' as *;

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  text-align: center;
  padding: 0 var(--spacing-xl);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  
  .logo-text {
    font-family: var(--font-family-latin);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-light);
    letter-spacing: 0.2em;
    color: var(--primary-color);
    text-transform: uppercase;
  }
}

.season-nav {
  display: flex;
  gap: var(--spacing-md);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.left {
    right: calc(53% + 120px);
  }

  &.right {
    left: calc(53% + 120px);
  }

  .season-link {
    font-size: var(--font-size-lg);
    color: var(--text-color);
    transition: color var(--transition-normal);

    &:hover,
    &.router-link-active {
      color: var(--primary-color);
    }
  }
}

.nav-links {
  display: flex;
  gap: var(--spacing-md);
  margin-left: auto;
  
  a {
    font-weight: var(--font-weight-light);
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    
    &.router-link-active {
      opacity: 0.5;
    }
  }
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 20px;
  position: relative;
  
  span {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--primary-color);
    position: absolute;
    transition: var(--transition-normal);
    
    &:first-child {
      top: 0;
    }
    
    &:last-child {
      bottom: 0;
    }
  }
  
  &.is-active {
    span {
      &:first-child {
        top: 50%;
        transform: rotate(45deg);
      }
      
      &:last-child {
        bottom: 50%;
        transform: rotate(-45deg);
      }
    }
  }
}

.main-content {
  flex: 1;
  margin-top: calc(var(--spacing-sm) * 2 + 2rem);
}

.footer {
  padding: var(--spacing-md);
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-light);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-normal);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
    position: absolute;
    right: var(--spacing-md);
  }

  .nav-container {
    padding: 0;
    justify-content: center;
  }

  .season-nav {
    display: none;
  }

  .logo {
    padding: var(--spacing-md);
    position: relative;
    left: 0;
    transform: none;
    
    .logo-text {
      font-size: var(--font-size-lg);
    }
  }

  .nav-links {
    display: none;
    position: fixed;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100vh;
    background-color: var(--background-color);
    padding: var(--spacing-xl) var(--spacing-md);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-lg);
    z-index: 1000;

    &.is-open {
      display: flex;
    }

    a {
      font-size: var(--font-size-xl);
      letter-spacing: 0.2em;
    }
  }
}
</style>
