$(document).ready(function () {
  const apiUrl = "https://equran.id/api/v2/surat";

  // Fungsi untuk mengambil data surah
  function fetchSurahList() {
    $.ajax({
      url: apiUrl,
      method: "GET",
      success: function (response) {
        displaySurahList(response.data);
      },
      error: function (error) {
        console.error("Gagal mengambil data surah:", error);
      },
    });
  }

  // Fungsi untuk menampilkan daftar surah
  function displaySurahList(surahList) {
    const surahListContainer = $("#surah-list");
    surahListContainer.empty();

    surahList.forEach((surah) => {
      const surahCard = `
                <div class="col-md-4 mb-4">
                    <div class="card surah-card" data-surah-number="${surah.nomor}">
                        <div class="card-body">
                            <h5 class="card-title">${surah.namaLatin}</h5>
                            <p class="card-text">${surah.arti}</p>
                            <small>${surah.jumlahAyat} Ayat</small>
                        </div>
                    </div>
                </div>
            `;
      surahListContainer.append(surahCard);
    });

    // Tambahkan event listener untuk card surah
    $(".surah-card").on("click", function () {
      const surahNumber = $(this).data("surah-number");
      fetchSurahDetail(surahNumber);
    });
  }

  // Fungsi untuk mengambil detail surah
  function fetchSurahDetail(surahNumber) {
    const detailUrl = `https://equran.id/api/v2/surat/${surahNumber}`;
    $.ajax({
      url: detailUrl,
      method: "GET",
      success: function (response) {
        displaySurahDetail(response.data);
      },
      error: function (error) {
        console.error("Gagal mengambil detail surah:", error);
      },
    });
  }

  // Fungsi untuk menampilkan detail surah dalam modal
  function displaySurahDetail(surahDetail) {
    const detailContent = `
            <h4>${surahDetail.namaLatin} (${surahDetail.arti})</h4>
            <p><strong>Tempat Turun:</strong> ${surahDetail.tempatTurun}</p>
            <p><strong>Jumlah Ayat:</strong> ${surahDetail.jumlahAyat}</p>
            <hr>
            <h5>Ayat:</h5>
            <ul>
                ${surahDetail.ayat
                  .map(
                    (ayat) => `
                    <li>
                        <p><strong>Ayat ${ayat.nomorAyat}:</strong> ${ayat.teksArab}</p>
                        <p>${ayat.teksLatin}</p>
                        <p><em>${ayat.teksIndonesia}</em></p>
                    </li>
                `
                  )
                  .join("")}
            </ul>
        `;
    $("#surah-detail-content").html(detailContent);
    $("#surahDetailModal").modal("show");
  }

  // Memuat daftar surah saat halaman dimuat
  fetchSurahList();
});
