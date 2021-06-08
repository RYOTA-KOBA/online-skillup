<template>
  <div>
    <h1>チャット</h1>
    <ul class="chat-wrapper">
      <li class="chat-msg" v-for="(msg, index) in messages" :key="index">
        <p>
          {{ msg.message }}
        </p>
      </li>
    </ul>

    <form @submit.prevent="sendMessage(message)">
      <input class="form-input" type="text" v-model="message" />
    </form>
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

<style scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 700px;
  overflow-y: scroll;
}
.chat-msg {
  list-style: none;
  border: 1px solid rgb(172, 172, 172);
  border-radius: 10px;
  background-color: rgb(228, 228, 228);
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
  margin: 5px 0;
  margin-right: 10px;
}
.chat-msg p {
  margin: 0;
}

.form-input {
  width: 80%;
  height: 20px;
  border-radius: 8px;
  border: 1px solid rgb(99, 99, 99);
}
.form-input:focus {
  outline: none;
}
</style>
