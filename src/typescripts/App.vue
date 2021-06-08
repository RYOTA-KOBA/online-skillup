<template>
  <div>
    <h1>チャット</h1>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg.message }}</li>
    </ul>
    <div>
      <input type="text" @keyup.enter="sendMessage()" v-model="message" />
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "room",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      messages: [],
      // 1) サーバ連結
      socket: io("localhost:3001"),
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    sendMessage(message) {
      console.log(message),
        // 2) メッセージをサーバで送信
        this.socket.emit("SEND_MESSAGE", { message });
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    // 3) サーバの変更内容を受信
    this.socket.on("MESSAGE", (data) => {
      this.messages = [...this.messages, data];
    });
  },
};
</script>
