const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

const tempEl = document.getElementById("temp");
const humEl = document.getElementById("hum");
const timeEl = document.getElementById("time");
const alertBox = document.getElementById("alert");

client.on("connect", function () {
    console.log("MQTT conectado");

    client.subscribe("esp32/temperatura");
    client.subscribe("esp32/humedad");
});

client.on("message", function (topic, message) {

    const msg = message.toString();

    if(topic === "esp32/temperatura"){

        tempEl.innerHTML = msg + " °C";

        if(parseFloat(msg) > 30){
            alertBox.innerHTML = "⚠ Temperatura alta!";
            alertBox.style.borderLeft = "5px solid red";
        } else {
            alertBox.innerHTML = "Sistema estable ✔";
            alertBox.style.borderLeft = "5px solid #22c55e";
        }
    }

    if(topic === "esp32/humedad"){
        humEl.innerHTML = msg + " %";
    }

    timeEl.innerHTML = new Date().toLocaleTimeString();
});

function manualRefresh(){
    location.reload();
}