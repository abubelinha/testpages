<hmml>
<head>
</head>
<!-- 

https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/

https://travishorn.com/responsive-grid-in-2-minutes-with-css-grid-layout-4842a41420fe
-->

<style>
html { font-size: 22px; }
body { padding: 1rem; }

.card {
  background-color: dodgerblue;
  color: white;
  padding: 1rem;
  height: 4rem;
}

.card1 { background-color: blue;
  color: red; }

.cards {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

</style>

<body>

<div class="cards">
  <div class="card">OoooNE</div>
  <div class="card card1">TWO</div>
  <div class="card">THREE</div>
  <div class="card">FOUR</div>
  <div class="card">FIVE</div>
  <div class="card">SIX</div>
  <div class="card">SEVEN</div>
  <div class="card">EIGHT</div>
  <div class="card">NINE</div>
  <div class="card">TEN</div>
  <div class="card">ELEVEN</div>
  <div class="card">TWELVE</div>
</div>
</body>

