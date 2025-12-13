<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import 'gitalk/dist/gitalk.css'; // 引入 CSS 样式
import Gitalk from 'gitalk'; // 假设你已安装 npm install gitalk

// 定义组件 Props，用于 GitTalk 的配置
interface Props {
  id: string; // 唯一 ID，通常是页面路径或 slug
  title: string; // 页面标题
  owner: string; // GitHub 仓库所有者
  repo: string; // GitHub 仓库名
  clientID: string; // GitHub App Client ID
  clientSecret: string; // GitHub App Client Secret
}

const props = defineProps<Props>();

onMounted(() => {
  // 确保 DOM 已经完全更新
  nextTick(() => {
    const gitalk = new Gitalk({
      // 关键配置项
      id: props.id,
      title: props.title,
      owner: props.owner,
      repo: props.repo,
      clientID: props.clientID,
      clientSecret: props.clientSecret,

      // 可选配置项
      admin: [props.owner], // 只有仓库所有者可以管理评论
      distractionFreeMode: false, // 启用分散注意力的无干扰模式
    });

    // 渲染评论区到 id 为 'gitalk-container' 的 DOM 元素
    gitalk.render('gitalk-container');
  });
});
</script>

<template>
  <div id="gitalk-container" class="gittalk-container">
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