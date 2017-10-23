<temeplate>
  <div class="find">
    品牌详情页
  </div>
</temeplate>
<script>
  import API from '@/api'

  export default {
    data () {
      return {
      }
    },
    components: {
    },
    created () {
      this.getFinds()
    },
    methods: {
      getBrands () {
        API.getBrands()
          .then(res => {
            console.log(res)
          })
      }
    }
  }
</script>
<style scope>

</style>
