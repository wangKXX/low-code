<template>
    <div class="lowcode-container">
        <el-container>
            <el-header>
            <el-button @click="handleClick" type="primary">预览</el-button>
            </el-header>
            <el-container>
                <el-aside width="60px">
                    <ComponentsMain></ComponentsMain>
                </el-aside>
                <el-main>
                    <ComponentEngine></ComponentEngine>
                </el-main>
                <el-aside>
                    <ComponentPropsSetting></ComponentPropsSetting>
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import ComponentsMain from './ComponentsMain.vue';
import ComponentEngine from './ComponentEngine.vue';
import ComponentPropsSetting from './ComponentPropsSetting.vue';
import router from '@/router';
const handleClick = () => {
    router.push({name: 'preview'})
}
</script>
<style lang="less" scoped>
.lowcode-container {
    height: 100%;
    :deep(.el-container) {
        height: 100%;
    }
    :deep(.el-main) {
        background-color: #f0f0f0;
    }
    :deep(.el-aside) {
        border-left: 1px solid #e8e8e8;
    }
    :deep(.el-header) {
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>