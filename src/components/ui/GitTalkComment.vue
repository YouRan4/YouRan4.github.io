<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import 'gitalk/dist/gitalk.css'; 
import Gitalk from 'gitalk'; 

// ------------------------------------------------------------------
// 核心改动：移除静态配置的 Props，只保留页面动态数据
// ------------------------------------------------------------------
interface Props {
  id: string;    // 唯一 ID，通常是页面路径或 slug (必须通过 props 传入)
  title: string; // 页面标题 (必须通过 props 传入)
  url?: string;  // 页面完整 URL (可选)
}

const props = defineProps<Props>();

// ------------------------------------------------------------------
// 在组件内部读取 GitTalk 配置（静态配置）
// ------------------------------------------------------------------

// ⚠️ 注意：这里假设您的环境变量使用了 PUBLIC_ 前缀，符合 Astro 客户端变量的约定。
const GITHUB_OWNER = 'YouRan4';       // <-- 请替换为您的 GitHub 用户名
const GITHUB_REPO = 'YouRan4.github.io';             // <-- 请替换为存储评论的仓库名

const CLIENT_ID = import.meta.env.PUBLIC_GITTALK_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.PUBLIC_GITTALK_CLIENT_SECRET;

// 建议进行运行时检查，以确保密钥已配置
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "GitTalk Error: CLIENT_ID or CLIENT_SECRET is missing. Check your .env file or GitHub Actions secrets."
  );
}

onMounted(() => {
  // 确保 DOM 已经完全更新
  nextTick(() => {
    // 只有在关键配置存在时才尝试初始化
    if (!CLIENT_ID || !CLIENT_SECRET) return; 

    const gitalk = new Gitalk({
      // 动态数据 (从 Props 获取)
      id: props.id,
      title: props.title,
      
      // 静态配置 (在组件内部定义或读取)
      owner: GITHUB_OWNER, 
      repo: GITHUB_REPO, 
      clientID: CLIENT_ID, 
      clientSecret: CLIENT_SECRET,
      
      // 可选配置项
      admin: [GITHUB_OWNER], // 使用内部定义的 OWNER 变量
      distractionFreeMode: false
    });

    // 渲染评论区到 id 为 'gitalk-container' 的 DOM 元素
    gitalk.render('gitalk-container');
  });
});
</script>

<template>
  <div id="gitalk-container" class="gittalk-container">
    <div v-if="!CLIENT_ID" class="text-center text-red-500 p-4 border border-red-300 rounded">
        GitTalk 评论系统未配置或缺少密钥 (CLIENT_ID / CLIENT_SECRET)。
    </div>
  </div>
</template>

<style scoped>
/* 可选：为容器添加一些样式 */
.gittalk-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>