<template>
  <div class="gallery">
    <header class="gallery-header">
      <div class="container">
        <h1 class="chinese-text">摄影作品集</h1>
        <nav class="navigation">
          <div class="year-nav">
            <button 
              v-for="year in years" 
              :key="year.value"
              :class="{ active: currentYear === year.value }"
              @click="currentYear = year.value"
            >
              <span class="latin-text">{{ year.label }}</span>
            </button>
          </div>
          <div class="season-nav">
            <button 
              v-for="season in seasons" 
              :key="season.value"
              :class="{ active: currentSeason === season.value }"
              @click="currentSeason = season.value"
            >
              <span class="chinese-text">{{ season.label }}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main class="gallery-content">
      <div class="container">
        <div class="grid">
          <article 
            v-for="photo in filteredPhotos" 
            :key="photo.id"
            class="photo-item"
            @click="openPhotoDetail(photo)"
          >
            <div class="image-container">
              <img :src="photo.url" :alt="photo.title" loading="lazy">
            </div>
          </article>
        </div>
      </div>
    </main>

    <div v-if="selectedPhoto" class="photo-modal" @click="selectedPhoto = null">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="selectedPhoto = null">&times;</button>
        <img :src="selectedPhoto.url" :alt="selectedPhoto.title">
        <div class="photo-details">
          <h2 class="chinese-text">{{ selectedPhoto.title }}</h2>
          <p class="category chinese-text">{{ selectedPhoto.category }}</p>
          <p class="description chinese-text">{{ selectedPhoto.description }}</p>
          <div class="metadata">
            <span class="latin-text">{{ selectedPhoto.date }}</span>
            <span class="chinese-text">{{ selectedPhoto.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const years = [
  { label: '2024', value: '2024' }
]

const seasons = [
  { label: '春', value: 'spring' },
  { label: '夏', value: 'summer' },
  { label: '秋', value: 'autumn' },
  { label: '冬', value: 'winter' }
]

const currentYear = ref('2024')
const currentSeason = ref('spring')
const selectedPhoto = ref(null)

const photos = ref([
  {
    id: 1,
    url: 'https://placekitten.com/800/800',
    title: '城市剪影',
    category: 'architecture',
    description: '现代都市建筑的几何美感',
    date: '2024-01-15',
    location: '上海'
  },
  {
    id: 2,
    url: 'https://placekitten.com/801/801',
    title: '山间晨雾',
    category: 'landscape',
    description: '晨光中的山谷雾景',
    date: '2024-02-20',
    location: '黄山'
  },
  {
    id: 3,
    url: 'https://placekitten.com/802/802',
    title: '街头瞬间',
    category: 'street',
    description: '城市生活中的偶然相遇',
    date: '2024-03-05',
    location: '北京'
  },
  {
    id: 4,
    url: 'https://placekitten.com/803/803',
    title: '光影人像',
    category: 'portrait',
    description: '自然光下的人物肖像',
    date: '2024-03-10',
    location: '杭州'
  }
])

const filteredPhotos = computed(() => {
  return photos.value.filter(photo => {
    const photoYear = photo.date.split('-')[0]
    const photoMonth = parseInt(photo.date.split('-')[1])
    let photoSeason = ''
    
    if (photoMonth >= 3 && photoMonth <= 5) photoSeason = 'spring'
    else if (photoMonth >= 6 && photoMonth <= 8) photoSeason = 'summer'
    else if (photoMonth >= 9 && photoMonth <= 11) photoSeason = 'autumn'
    else photoSeason = 'winter'
    
    return photoYear === currentYear.value && photoSeason === currentSeason.value
  })
})

const openPhotoDetail = (photo) => {
  selectedPhoto.value = photo
}
</script>

<style scoped lang="scss">
.gallery {
  padding-top: var(--spacing-lg);
}

.gallery-header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
  
  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: var(--spacing-lg);
    font-weight: var(--font-weight-light);
    letter-spacing: 0.2em;
  }
}

.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.year-nav,
.season-nav {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
}

.year-nav button {
  font-size: var(--font-size-xl);
  padding: var(--spacing-xs) var(--spacing-md);
}

.season-nav button {
  font-size: var(--font-size-lg);
  min-width: 80px;
}

.year-nav button,
.season-nav button {
  background: none;
  border: 1px solid var(--border-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--background-color);
  }

  &:hover:not(.active) {
    border-color: var(--primary-color);
  }
}

.gallery-content {
  padding-bottom: var(--spacing-xl);
  
  .photo-item {
    cursor: pointer;
    
    .image-container {
      aspect-ratio: 1;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity var(--transition-normal);
      }
      
      &:hover::after {
        opacity: 1;
      }
    }
  }
}

.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: var(--spacing-md);
  
  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background: var(--background-color);
    
    img {
      max-width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }
    
    .close-button {
      position: absolute;
      top: var(--spacing-sm);
      right: var(--spacing-sm);
      background: none;
      border: none;
      color: var(--text-color);
      font-size: 2rem;
      cursor: pointer;
      padding: 0;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--transition-normal);
      
      &:hover {
        transform: rotate(90deg);
      }
    }
    
    .photo-details {
      padding: var(--spacing-md);
      
      h2 {
        font-size: 1.5rem;
        margin-bottom: var(--spacing-xs);
      }
      
      .category {
        color: var(--text-light);
        font-size: 0.9rem;
        margin-bottom: var(--spacing-sm);
      }
      
      .description {
        margin-bottom: var(--spacing-md);
        line-height: 1.6;
      }
      
      .metadata {
        display: flex;
        gap: var(--spacing-md);
        color: var(--text-light);
        font-size: 0.9rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .gallery {
    padding-top: var(--spacing-md);
  }
  
  .gallery-header {
    margin-bottom: var(--spacing-lg);
    
    h1 {
      margin-bottom: var(--spacing-md);
    }
  }
  
  .category-nav {
    gap: var(--spacing-sm);
    padding: 0 var(--spacing-sm);
    
    button {
      padding: var(--spacing-xs);
    }
  }
  
  .photo-modal .modal-content {
    width: 100%;
    
    .photo-details {
      padding: var(--spacing-sm);
    }
  }
}
</style>