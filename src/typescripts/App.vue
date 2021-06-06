<template>
  <div>
    <p>
      <img class="logo" src="./img/logo.jpg" alt="ロゴ" />
      <span class="sample">サンプルコード</span>
    </p>
    <MyComponent :message="$data.message" />
    <form @submit="onSubmit">
      <input v-model="$data.text" type="text" />
      <button type="submit">送信</button>
    </form>
  </div>
</template>

<script>
import socket from "./utils/socket";

// components
import MyComponent from "./components/MyComponent.vue";

export default {
  components: {
    MyComponent,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      message: "",
      text: "",
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    socket.on("connect", () => {
      console.log("connected!");
    });

    socket.on("send", (message) => {
      console.log(message);
      this.$data.message = message;
    });
  },
  methods: {
    /**
     * Enterボタンを押したとき
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    onSubmit(e) {
      e.preventDefault();
      socket.emit("send", this.$data.text);
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
}

.sample {
  color: $red;
}
</style>
