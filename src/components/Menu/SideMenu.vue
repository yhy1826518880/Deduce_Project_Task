<template>
    <a-layout-sider
            :class="[
      'sider',
      isDesktop() ? null : 'shadow',
      theme,
      fixSiderbar ? 'ant-fixed-sidemenu' : null
    ]"
            width="300px"
            :collapsible="collapsible"
            v-model="collapsed"
            :trigger="null"
    >
        <logo />
        <s-menu
                :collapsed="collapsed"
                :menu="menus"
                :theme="theme"
                :mode="mode"
                @select="onSelect"
                style="padding: 16px 0px;"
        ></s-menu>
        <dv-decoration-9
                style="width:60px;height:60px;position: absolute;bottom: 20px;left: 10px;"
        ></dv-decoration-9>
    </a-layout-sider>
</template>

<script>
    import Logo from '@/components/tools/Logo'
    import SMenu from './index'
    import { mixin, mixinDevice } from '@/utils/mixin'

    export default {
        name: 'SideMenu',
        components: { Logo, SMenu },
        mixins: [mixin, mixinDevice],
        props: {
            mode: {
                type: String,
                required: false,
                default: 'inline'
            },
            theme: {
                type: String,
                required: false,
                default: 'dark'
            },
            collapsible: {
                type: Boolean,
                required: false,
                default: false
            },
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            },
            menus: {
                type: Array,
                required: true
            }
        },
        methods: {
            onSelect(obj) {
                this.$emit('menuSelect', obj)
            }
        }
    }
</script>