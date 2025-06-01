<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="chinese-text">數字畫廊</h1>
        <p class="chinese-text">模糊記憶的數字備份</p>
      </div>
    </section>

    <section class="featured">
      <div class="container">
        <h2 class="chinese-text">精选作品</h2>
        <div class="grid">
          <article v-for="(photo, index) in featuredPhotos" 
                   :key="index" 
                   class="photo-item"
                   @click="showPhotoDetail(photo)">
            <div class="image-container">
              <img :src="photo.url" :alt="photo.title" loading="lazy">
            </div>
            <div class="photo-info">
              <h3 class="chinese-text">{{ photo.title }}</h3>
              <p class="chinese-text">{{ photo.category }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="about-preview">
      <div class="container">
        <div class="about-content">
          <h2 class="chinese-text">碎碎念</h2>
          <p class="chinese-text">「我沒有故事，只有一些想留存的記憶」</p>
          <RouterLink to="/about" class="learn-more chinese-text">了解更多</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const featuredPhotos = ref([
  {
    url: '/src/assets/star.jpg',
    title: 'M42',
    category: 'Deep Space',
    description: '猎户座大星云'
  },
  {
    url: '/src/assets/winter.jpg',
    title: '雪國冷湖',
    category: 'Landsacpe',
    description: '冰封的山河'
  },
  {
    url: '/src/assets/farewell.jpg',
    title: 'Farewell',
    category: 'Street',
    description: '塔斯馬尼亞渡口送別的父子'
  }
])

const showPhotoDetail = (photo) => {
  // 这里可以添加查看大图的逻辑
  console.log('Show photo detail:', photo)
}
</script>

<style scoped lang="scss">
.hero {
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
              url('/src/assets/star.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--background-color);
  
  .hero-content {
    h1 {
      font-size: clamp(2.5rem, 8vw, 4rem);
      margin-bottom: var(--spacing-sm);
      font-weight: var(--font-weight-light);
      letter-spacing: 0.2em;
    }
    
    p {
      font-size: clamp(1rem, 3vw, 1.5rem);
      opacity: 0.9;
      font-weight: var(--font-weight-light);
      letter-spacing: 0.1em;
    }
  }
}

.featured {
  padding: var(--spacing-xl) 0;
  background-color: var(--background-color);
  
  h2 {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    font-size: clamp(1.5rem, 4vw, 2rem);
    letter-spacing: 0.1em;
  }
  
  .photo-item {
    cursor: pointer;
    
    .image-container {
      aspect-ratio: 1;
      margin-bottom: var(--spacing-sm);
    }
    
    .photo-info {
      h3 {
        font-size: 1.1rem;
        margin-bottom: var(--spacing-xs);
      }
      
      p {
        font-size: 0.9rem;
        color: var(--text-light);
      }
    }
  }
}

.about-preview {
  padding: var(--spacing-xl) 0;
  background-color: var(--border-color);
  
  .about-content {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    
    h2 {
      margin-bottom: var(--spacing-md);
      font-size: clamp(1.5rem, 4vw, 2rem);
      letter-spacing: 0.1em;
    }
    
    p {
      margin-bottom: var(--spacing-md);
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--text-light);
    }
    
    .learn-more {
      display: inline-block;
      padding: var(--spacing-sm) var(--spacing-md);
      border: 1px solid var(--primary-color);
      font-size: 0.9rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      transition: all var(--transition-normal);
      
      &:hover {
        background-color: var(--primary-color);
        color: var(--background-color);
      }
    }
  }
}

@media (max-width: 768px) {
  .hero {
    height: 80vh;
  }
  
  .featured,
  .about-preview {
    padding: var(--spacing-lg) 0;
  }
  
  .about-preview .about-content {
    padding: 0 var(--spacing-md);
  }
}
</style>