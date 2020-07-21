 <template>
  <div class="container">
    <header>
      <HeaderNav />
    </header>
    <main>
      <h1>Consultant!</h1>
      <ul>
        <li>
          <nuxt-link to="/consultant/registrations">Registrations</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/consultant/registrations/new">
            New registration
          </nuxt-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HeaderNav from '~/components/nav/HeaderNav.vue';

@Component({
  middleware: 'consultant/authenticated',
  components: { HeaderNav },
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}

ul {
  list-style: none;
}
</style>
