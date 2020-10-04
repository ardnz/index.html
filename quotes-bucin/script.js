const blockquote = document.querySelector("blockquote");
const message = blockquote.querySelector("h1");
const author = blockquote.querySelector("p");
const refreshBtn = blockquote.querySelector("a");

// Where the quotes are stored
const quotes = [
  {
    message: "Aku bukan seseorang yang bisa membuatmu nyaman tapi setidaknya aku bisa membuatmu selalu bahagia dan terima kasih untuk apa yang kau terima dari ku :).",
    author: "Alfa"
  },
  {
    message: "Apa aku akan menyakiti diriku jika aku berani merindukanmu?, Apa tak apa jika air mataku jatuh ketika rindu ku ini dibalas oleh pengkhianatanmu?",
    author: "Nèro"
  },
  {
    message:
      "Lucu ya, jaman sekarang sang pelaku bertindak seolah olah dia yang menjadi korban.",
    author: "Jati Anugerah"
  },
  {
    message: "Siapa orang penuh dosa? bercerminlah, kau kan temukan jawabannya.",
    author: "Bayu Santoso"
  },
  {
    message: "Aku hanya berpesan jangan pernah tinggalkan ku tanpa alasan karena dibalik kepekaan masih ada perasaan",
    author: "Anisya"
  },
  {
    message: "Kamu tahu kata mundur? Ya sudah mundur tunggu apa lagi. Jangan sia-siakan waktumu lagi untuk hal yang bukan untukmu.",
    author: "Ucup Fachreza"
  },
  {
    message: "Jangan berlagak kau yang tersakiti, aktingmu gak cukup bagus",
    author: "Yolanda Oktaria"
  },
  {
    message: "Menyalahkanku diatas kebahagianmu? mengacalah, dirimu sudah benar apa tidak.",
    author: "Fernando"
  },
  {
    message:
      "Sebenci itu aku perihal dia, air mataku sia sia jatuh, kebodohan merajaiku saat itu.",
    author: "Rihal"
  },
  {
    message:
      "Makin malam, overthinking - ku makin menjadi.",
    author: "Lintang"
  },
  {
    message:
      "aku, definisi yang mencintaimu apa adanya bukan ada apanya.",
    author: "Naraya"
  },
  {
    message:
      "Mencintaimu tanpa sengaja dan menjaga sepenuh hati perasaan yang telah tumbuh, itulah aku.",
    author: "Nue404"
  },
  {
    message:
      "sabar, itu prinsipku menghadapimu",
    author: "Hades"
  },
  {
    message: "Karena pada dasarnya yang menyakiti akan tersakiti, itu sudah hukum alam.",
    author: "Anjai Ibrahim"
  },
  {
    message:
      "bingung, kenapa aku bisa sesabar ini memendam perasaan ini padamu.",
    author: "Syaki Haxor"
  },
  {
    message: "aku tak mengerti dirimu, yang aku tau kamu punyaku",
    author: "Dian"
  },
  {
    message: "Yang biasanya menolehkan perasaan kini membuang perasaan.",
    author: "Candra"
  },
  {
    message: "Aku hanya ingin bersamamu jadi aku mohon ,jangan buka hatimu untuk mereka lagi:')",
    author: "Arya Kresna"
  }
];

function newQuote(e) {
  // Cross Browser Support
  // If the variable e does not exist
  // Make it a reference to window.event
  if (!e) var e = window.event;

  // Prevent link's default behavior
  e.preventDefault();

  // Generate a random number and store in variable "i"
  let i = Math.floor(Math.random() * quotes.length);

  // Ensure new quote is selected
  // If it is new, print it out
  // If not, run function again
  if (message.innerText != quotes[i].message) {
    message.innerText = quotes[i].message;
    author.innerText = "— " + quotes[i].author;
  } else {
    newQuote(e);
  }
}

refreshBtn.addEventListener("click", newQuote, false);
