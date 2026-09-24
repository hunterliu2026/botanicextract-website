/* ============================================================
   BotanicExtract AI Chat Widget (自建轻量版, v10 - 精简版话术)
   ------------------------------------------------------------
   刘哥改话术就看这里 ↓↓↓  知识库 KB 在下面, 改/加条目就行:
   每条 = { k: ["关键词1","关键词2"], a: "英文回复话术" }
   客户消息里命中任意一个关键词, 就回对应的 a。
   话术原则: 一两句话说清 + 反问一句抓客户, 别写长段落。
   ============================================================ */

var KB = [
  { k: ["price","pricing","cost","quotation","quote","how much"],
    a: "Tell me the item, spec and quantity — you'll have tiered pricing within 24 hours. What item are you buying?" },
  { k: ["moq","minimum","minimum order"],
    a: "MOQ is just 1 kg per item. Paid samples available if you want to test first. What quantity do you need?" },
  { k: ["sample","free sample","samples"],
    a: "Yes — samples come from real production lots, so you test the true material. A small evaluation quantity is free; larger amounts at cost plus courier. Which item would you like to test?" },
  { k: ["lead time","delivery","how long","shipping time","dispatch","production time"],
    a: "In stock: about 2 days to prepare + 3 days inland to Shenzhen + about 6 days by air — around 11 days door to door. Made-to-order batches add 3–5 production days. Exact dates are confirmed on the PI." },
  { k: ["payment","pay","t/t","paypal","terms of payment","deposit"],
    a: "30% T/T deposit, 70% before shipment. PayPal and local USD/EUR transfers work for samples. Any preference?" },
  { k: ["fob","cif","ddp","incoterm","trade term","fca"],
    a: "We ship on FOB terms — goods loaded at the Chinese port, export clearance and documents handled by us. Tell me your destination port and I'll quote." },
  { k: ["order","process","how to buy","how do i order","next step","pi "],
    a: "Simple: send item + spec + quantity → quote within 24h → PI + 30% deposit → production and dispatch with full documents. Ready to start?" },
  { k: ["coa","certificate of analysis","msds","document","documentation","report","testing","usp"],
    a: "Every batch ships with a COA — electronic as standard, paper on request — stating the methods (HPLC/TLC, heavy metals) and your lot's actual results. Need any other document?" },
  { k: ["shipping","ship","dhl","fedex","air freight","sea","delivery method","freight"],
    a: "Samples: DHL/FedEx, 3–5 days. Bulk: about 3 days inland to Shenzhen, then air (about 6 days) or sea. Full export documents included." },
  { k: ["packing","package size","drum","shelf life","storage","foil bag","packaging"],
    a: "25 kg fibre drums with double PE liner; 1–5 kg foil bags for samples. 24-month shelf life, cool and dry." },
  { k: ["quality","qc","control","hplc","third party","test method","specification"],
    a: "Every lot is tested against a written spec and ships with a batch COA. Want independent proof? We'll supply the retained sample for any lab you choose." },
  { k: ["product","catalog","catalogue","items","range","what do you offer","what do you sell"],
    a: "50+ documented extracts — astragalus, milk thistle, berberine, rhodiola and more. Which category do you buy for: supplements, food & beverage, or traditional formulas?" },
  { k: ["astragalus","huang qi"],
    a: "A core item: polysaccharides 20%–50%, Astragaloside IV 0.3%–0.5%, batch COA. Tell me your spec and quantity for a quote." },
  { k: ["berberine","berberine hcl"],
    a: "Berberine HCl 97% — our metabolic bestseller, MOQ from 1 kg. Quantity and destination? Hunter will send the quote." },
  { k: ["milk thistle","silymarin"],
    a: "Silymarin 80% by UV (HPLC also available) — a U.S.-market classic. Full spec and typical COA on the product page." },
  { k: ["rhodiola","rosavin","salidroside"],
    a: "Genuine R. rosea, rosavins 3% + salidroside 1% (stronger ratios available), HPLC tested. What's your target spec?" },
  { k: ["ginkgo","ginkgolic"],
    a: "Flavones 24% + lactones 6%, ginkgolic acid below 5 ppm — the USP profile. COA and HPLC chromatogram with samples." },
  { k: ["where","location","company","about you","who are you","xi'an","xian"],
    a: "We're BotanicExtract, based in Xi'an — the heart of China's botanical extract industry — shipping worldwide." },
  { k: ["factory","manufacture","your plant","own factory","production line","production base","gmp workshop"],
    a: "Fair question. We're an export company working with certified partner factories in Shaanxi — one contact, full documentation, no single-plant capacity limits. On-site visits can be arranged when you're in China." },
  { k: ["trading company","trader","agent","middleman","代表","是否贸易"],
    a: "Yes, we're a trading company — and upfront about it. You get factory pricing plus spec control, batch testing and export documents factories rarely handle." },
  { k: ["visit","audit","video call","video tour","see the factory","inspection","验厂"],
    a: "Always welcome — you're invited to visit the production facility in Shaanxi any working day. Tell me when you're planning to come." },
  { k: ["oem","private label","custom","brand","packaging"],
    a: "Yes — private label from 1 kg: your spec, your packaging, full documentation." },
  { k: ["iso","gmp","organic","certification","certificate"],
    a: "Our partners hold ISO 22000 and GMP; organic options available. Documents shared under NDA — just ask." },
  { k: ["whatsapp","phone","call","contact","email","reach"],
    a: "Fastest: the green WhatsApp button on this page. Or email hunter@botanicextract.com." },
  { k: ["social","facebook","linkedin","instagram","youtube","twitter","follow"],
    a: "Yes — LinkedIn, YouTube, Facebook and Instagram, all under \"BotanicExtract\"." },
  { k: ["hi","hello","hey","good morning","good afternoon"],
    a: "Hello! Ask me about price, MOQ, samples, lead time or documents — or pick a topic below." },
  { k: ["discount","cheaper","best price","bulk","volume","wholesale"],
    a: "Prices are tiered — more volume, better rate. Send item, spec and quantity for tiered pricing." },
  { k: ["reship","customs","duty","tariff","clearance","hs code"],
    a: "Full export set (invoice, packing list, COA, MSDS) plus HS codes. Tell me the destination and I'll flag the duties." },
  { k: ["thank","thanks","great","perfect","awesome"],
    a: "Anytime! Hunter reads every chat and replies personally within 24 hours." },
  { k: ["bye","goodbye","see you","later"],
    a: "Thanks for stopping by! Leave a message anytime — Hunter replies within 24 hours." },
  { k: ["human","real person","someone","sales rep","salesperson","manager","boss","真人","接管"],
    a: "You're not talking into a void — Hunter reads every message and replies within 24 hours. Leave your question + email or WhatsApp here, or tap the green WhatsApp button for instant chat."
    }
];

var CHIPS = ["Price", "MOQ", "Samples", "Lead time", "COA & documents", "OEM service", "Talk to a human"];
var FALLBACK = "Good one — Hunter will answer that personally. Leave your question + email or WhatsApp here and you'll hear back within 24 hours. Or tap the WhatsApp button for instant chat.";
var REPLY_DELAY = 600;

/* ---- 真人消息转达 ------------------------------------------------
   客户在聊天框里发过的每条消息, 在他关掉聊天面板时自动打包发到
   Formspree -> hunter@botanicextract.com, 刘哥邮箱/手机邮件实时可收。
   客户无感知; 只有他真的输入过消息才会发送, 每次新增内容只发一次。 */
var FORMSPREE = "https://formspree.io/f/xdekeobl";

/* ---- 微信实时推送 (PushPlus) --------------------------------------
   客户消息 -> PushPlus -> 刘哥微信, 秒级到达。
   fire-and-forget: 推送失败不影响聊天和表单本身。 */
var PUSHPLUS_TOKEN = "0ff7d3eaca2446cda87743897861addc";

function beNotifyWeChat(title, content) {
  try {
    var url = "https://www.pushplus.plus/send?token=" + PUSHPLUS_TOKEN +
              "&title=" + encodeURIComponent(title) +
              "&content=" + encodeURIComponent(content) +
              "&template=txt";
    fetch(url, { mode: "no-cors" }).catch(function () {});
  } catch (e) { /* 静默失败 */ }
}
var userMsgs = [];   // 客户输入的原文
var sentCount = 0;   // 已转发条数

function forwardTranscript() {
  if (userMsgs.length <= sentCount) return;   // 没有新内容
  var body = userMsgs.slice(sentCount).map(function (m, i) {
    return (sentCount + i + 1) + ". " + m;
  }).join("\n");
  sentCount = userMsgs.length;
  beNotifyWeChat("💬 网站聊天: 客户发来消息",
    "客户在聊天框输入了新消息, 请尽快回复:\n\n" + body +
    "\n\n页面: " + location.href +
    "\n时间: " + new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }));
  var payload = {
    _subject: "💬 Website chat NOW: customer message (reply within 24h)",
    name: "Website chat visitor",
    email: "chat@botanicextract.com",
    message: "New message(s) typed into the website chat widget:\n\n" + body +
             "\n\nPage: " + location.href +
             "\nTime: " + new Date().toISOString(),
    product: "Website chat"
  };
  try {
    fetch(FORMSPREE, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).catch(function () {});
  } catch (e) { /* 静默失败, 不影响聊天 */ }
}

(function () {
  if (window.__beChatLoaded) return; window.__beChatLoaded = true;

  var box, log, input, btn;
  var opened = false;

  function build() {
    box = document.createElement("div");
    box.className = "chat-panel";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "BotanicExtract assistant");
    box.innerHTML =
      '<div class="chat-head"><div class="chat-who"><span class="chat-dot"></span>' +
      '<div><strong>BotanicExtract Assistant</strong><small>Replies instantly &middot; a real person reads every chat</small></div></div>' +
      '<button class="chat-x" type="button" aria-label="Close chat">&times;</button></div>' +
      '<div class="chat-log" aria-live="polite"></div>' +
      '<div class="chat-chips"></div>' +
      '<div class="chat-in"><input type="text" placeholder="Type your question..." aria-label="Your question">' +
      '<button type="button" aria-label="Send">Send</button></div>';
    document.body.appendChild(box);

    log = box.querySelector(".chat-log");
    input = box.querySelector(".chat-in input");
    btn = box.querySelector(".chat-in button");
    var chips = box.querySelector(".chat-chips");
    CHIPS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "chat-chip"; b.textContent = c;
      b.addEventListener("click", function () { ask(c); });
      chips.appendChild(b);
    });

    box.querySelector(".chat-x").addEventListener("click", close);
    btn.addEventListener("click", function () { send(); });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });

    var fab = document.querySelector(".fc-chat");
    if (fab) fab.addEventListener("click", toggle);
    else if (window.matchMedia && window.matchMedia("(min-width: 761px)").matches) {
      console.warn("[chat] .fc-chat button not found");
    }
  }

  function bubble(text, who) {
    var p = document.createElement("p");
    p.className = "chat-msg " + who;
    p.textContent = text;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  }

  function answer(q) {
    var t = q.toLowerCase(), best = null, bestScore = 0;
    KB.forEach(function (item) {
      var s = 0;
      item.k.forEach(function (kw) { if (t.indexOf(kw) !== -1) s += kw.length; });
      if (s > bestScore) { bestScore = s; best = item; }
    });
    return best ? best.a : FALLBACK;
  }

  function ask(q) {
    bubble(q, "me");
    userMsgs.push(q);
    setTimeout(forwardTranscript, 900);   // 每条消息发出后立即转发到邮箱
    setTimeout(function () { bubble(answer(q), "bot"); }, REPLY_DELAY);
  }

  function send() {
    var v = input.value.trim();
    if (!v) return;
    input.value = "";
    ask(v);
  }

  function open() {
    if (opened) return;
    opened = true;
    box.classList.add("chat-on");
    if (!log.children.length) {
      setTimeout(function () {
        bubble("Hi! I'm the BotanicExtract assistant. Ask me about price, MOQ, samples or documents — or pick a topic below.", "bot");
      }, 250);
    }
    setTimeout(function () { input.focus(); }, 100);
  }
  function close() {
    box.classList.remove("chat-on");
    input.blur();
    opened = false;
    forwardTranscript();   // 关面板时把客户消息转发给真人邮箱
  }
  function toggle() { opened ? close() : open(); }

  // 温和自动弹出: 每个会话只弹一次, 12 秒后
  function autoOpen() {
    try {
      if (sessionStorage.getItem("beChatShown")) return;
      sessionStorage.setItem("beChatShown", "1");
    } catch (e) { /* 隐私模式忽略 */ }
    setTimeout(open, 12000);
  }

  // 询盘表单提交 -> 微信推送 (表单本身照常 POST 到 Formspree)
  var enq = document.querySelector("form.enquiry");
  if (enq) {
    enq.addEventListener("submit", function () {
      var g = function (n) {
        var el = enq.querySelector('[name="' + n + '"]');
        return el && el.value ? el.value : "-";
      };
      beNotifyWeChat("🔔 网站询盘: " + g("name"),
        "新询盘已提交, 请查收 hunter@ 邮箱并尽快回复:\n\n" +
        "姓名: " + g("name") + "\n邮箱: " + g("email") +
        "\nWhatsApp: " + g("whatsapp") + "\n公司: " + g("company") +
        "\n需求: " + g("message") +
        "\n页面: " + location.href);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { build(); autoOpen(); });
  } else { build(); autoOpen(); }
})();
