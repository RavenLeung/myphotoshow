<template>
  <div class="about">
    <el-row justify="center">
      <el-col :span="24" :md="20" :lg="18" :xl="16">
        <div class="about-content">
          <div class="photographer-info">
            <el-avatar :size="screenWidth <= 768 ? 120 : 150" src="https://placekitten.com/200/200" class="avatar" />
            <h1 class="chinese-text">关于摄影师</h1>
            <p class="bio chinese-text">
              我不是攝影師，我只是喜歡按快門。
            </p>
          </div>

          <div class="equipment-section">
            <h2 class="chinese-text">摄影装备</h2>
            <el-row :gutter="{ xs: 12, sm: 16, md: 20 }">
              <el-col :span="24" :sm="12" v-for="(equipment, index) in equipmentList" :key="index">
                <el-card class="equipment-card">
                  <template #header>
                    <div class="equipment-header">
                      <el-icon><Camera /></el-icon>
                      <span class="chinese-text">{{ equipment.type }}</span>
                    </div>
                  </template>
                  <ul class="equipment-list">
                    <li v-for="(item, itemIndex) in equipment.items" :key="itemIndex" class="chinese-text">
                      {{ item }}
                    </li>
                  </ul>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <div class="contact-section">
            <h2 class="chinese-text">联系方式</h2>
            <div class="contact-info">
              <el-row :gutter="{ xs: 12, sm: 16, md: 20 }">
                <el-col :span="24" :sm="12" v-for="(contact, index) in contactInfo" :key="index">
                  <div class="contact-item">
                    <el-icon>
                      <component :is="contact.icon" />
                    </el-icon>
                    <span>{{ contact.value }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="awards-section">
            <h2>获奖经历</h2>
            <el-timeline>
              <el-timeline-item
                v-for="award in awards"
                :key="award.id"
                :timestamp="award.date"
                placement="top"
                class="award-item"
              >
                <el-card>
                  <h3>{{ award.title }}</h3>
                  <p>{{ award.description }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Camera, Message, Link, Phone } from '@element-plus/icons-vue'

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

const equipmentList = ref([
  {
    type: '相机设备',
    items: [
      'Sony A7III',
      'Canon EOS R5',
      'Fujifilm X-T4'
    ]
  },
  {
    type: '镜头装备',
    items: [
      'Sony 24-70mm f/2.8 GM',
      'Sony 85mm f/1.4 GM',
      'Canon RF 15-35mm f/2.8L'
    ]
  }
])

const contactInfo = ref([
  {
    icon: 'Message',
    value: 'photographer@email.com'
  },
  {
    icon: 'Phone',
    value: '+86 123 4567 8900'
  },
  {
    icon: 'Link',
    value: 'www.photography-portfolio.com'
  }
])

const awards = ref([
  {
    id: 1,
    date: '2024-01',
    title: '全国摄影大赛金奖',
    description: '作品《城市之光》获得年度风光摄影金奖'
  },
  {
    id: 2,
    date: '2023-09',
    title: '国际摄影展览优秀奖',
    description: '系列作品《街头印象》入选国际摄影展览并获得优秀奖'
  },
  {
    id: 3,
    date: '2023-05',
    title: '城市摄影周特别奖',
    description: '作品《都市剪影》获得城市摄影周评委会特别奖'
  }
])
</script>

<style scoped lang="scss">
.about {
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);

  .about-content {
    max-width: 1200px;
    margin: 0 auto;

    .photographer-info {
      text-align: center;
      margin-bottom: clamp(3rem, 8vw, 4rem);

      .avatar {
        margin-bottom: clamp(1.5rem, 4vw, 2rem);
        border: 4px solid var(--el-color-primary-light-8);
      }

      h1 {
        font-size: clamp(1.8rem, 4vw, 2.5rem);
        margin-bottom: clamp(1rem, 3vw, 1.5rem);
        color: var(--el-color-primary);
      }

      .bio {
        font-size: clamp(1rem, 1.8vw, 1.2rem);
        line-height: 1.8;
        color: #666;
        max-width: 800px;
        margin: 0 auto;
      }
    }

    .equipment-section,
    .contact-section,
    .awards-section {
      margin-bottom: clamp(3rem, 8vw, 4rem);

      h2 {
        font-size: clamp(1.5rem, 3vw, 2rem);
        margin-bottom: clamp(1.5rem, 4vw, 2rem);
        text-align: center;
        color: var(--el-color-primary);
      }
    }

    .equipment-card {
      height: 100%;
      margin-bottom: clamp(1rem, 3vw, 1.5rem);
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .equipment-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: clamp(1rem, 1.8vw, 1.2rem);

        .el-icon {
          color: var(--el-color-primary);
        }
      }

      .equipment-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 0.8rem 0;
          border-bottom: 1px solid #eee;
          font-size: clamp(0.9rem, 1.5vw, 1rem);

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }

    .contact-info {
      .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: clamp(1rem, 2vw, 1.5rem);
        padding: clamp(0.8rem, 2vw, 1.2rem);
        background-color: var(--el-color-primary-light-9);
        border-radius: 8px;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-3px);
        }

        .el-icon {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          color: var(--el-color-primary);
        }

        span {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
        }
      }
    }

    .awards-section {
      .award-item {
        padding-bottom: clamp(1.5rem, 4vw, 2rem);

        :deep(.el-timeline-item__node) {
          background-color: var(--el-color-primary);
        }

        :deep(.el-timeline-item__tail) {
          border-left-color: var(--el-color-primary-light-5);
        }

        .el-card {
          transition: transform 0.3s;

          &:hover {
            transform: translateX(5px);
          }

          h3 {
            margin: 0 0 0.5rem 0;
            font-size: clamp(1.1rem, 1.8vw, 1.3rem);
            color: var(--el-color-primary);
          }

          p {
            margin: 0;
            color: #666;
            font-size: clamp(0.9rem, 1.5vw, 1rem);
            line-height: 1.6;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .about {
    padding: 2rem 1rem;

    .about-content {
      .photographer-info {
        margin-bottom: 2.5rem;

        .bio {
          padding: 0 1rem;
        }
      }

      .equipment-section,
      .contact-section,
      .awards-section {
        margin-bottom: 2.5rem;
      }

      .contact-info {
        .contact-item {
          padding: 0.8rem;
          margin-bottom: 0.8rem;
        }
      }

      .awards-section {
        .award-item {
          padding-bottom: 1.5rem;
        }
      }
    }
  }
}
</style>