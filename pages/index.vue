<template>
  <div>
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from './admin'
export default {
  name: 'IndexPage',
  components: {
    Dashboard,
  },
  layout: 'defaultAdmin',
}
</script>
