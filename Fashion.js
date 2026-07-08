$(document).ready(function () {
  //==============================
  // SLIDER
  //==============================
  let current = 0;
  const slides = $(".slide");
  slides.hide();
  slides.eq(0).show();
  setInterval(function () {
    slides.eq(current).fadeOut(500);
    current++;
    if (current >= slides.length) {
      current = 0;
    }
    slides.eq(current).fadeIn(500);
  }, 3000);
  //==============================
  // SEARCH
  //==============================
  $("#search").keyup(function () {
    let value = $(this).val().toLowerCase();
    $(".product").each(function () {
      let name = $(this).find("h3").text().toLowerCase();
      $(this).toggle(name.indexOf(value) > -1);
    });
  });
  //==============================
  // CART
  //==============================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
  $(".add-cart").click(function () {
    let name = $(this).data("name");
    let price = Number($(this).data("price"));
    let item = cart.find(function (p) {
      return p.name === name;
    });
    if (item) {
      item.qty++;
    } else {
      cart.push({
        name: name,
        price: price,
        qty: 1,
      });
    }
    saveCart();
    renderCart();
    alert("Đã thêm vào giỏ hàng!");
  });
  //==============================
  // HIỂN THỊ GIỎ HÀNG
  //==============================
  function renderCart() {
    $("#cart-body").html("");
    let total = 0;
    let count = 0;
    cart.forEach(function (item, index) {
      total += item.price * item.qty;
      count += item.qty;
      $("#cart-body").append(`
<tr>
<td>${item.name}</td>
<td>${item.price.toLocaleString()} VNĐ</td>
<td>
<button class="minus" data-index="${index}">-</button>
${item.qty}
<button class="plus" data-index="${index}">+</button>
</td>
<td>${(item.price * item.qty).toLocaleString()} VNĐ</td>
<td>
<button class="delete" data-index="${index}">
Xóa
</button>
</td>
</tr>
`);
    });
    $("#total").text(total.toLocaleString());
    $("#cart-count").text(count);
  }
  //==============================
  // TĂNG SỐ LƯỢNG
  //==============================
  $(document).on("click", ".plus", function () {
    let index = $(this).data("index");
    cart[index].qty++;
    saveCart();
    renderCart();
  });
  //==============================
  // GIẢM SỐ LƯỢNG
  //==============================
  $(document).on("click", ".minus", function () {
    let index = $(this).data("index");
    cart[index].qty--;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  });
  //==============================
  // XÓA 1 SẢN PHẨM
  //==============================
  $(document).on("click", ".delete", function () {
    let index = $(this).data("index");
    if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });
  //==============================
  // XÓA TẤT CẢ
  //==============================
  $("#clear-cart").click(function () {
    if (cart.length == 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }
    if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
      cart = [];
      saveCart();
      renderCart();
      alert("Đã xóa toàn bộ giỏ hàng!");
    }
  });
  //==============================
  // LƯU LOCALSTORAGE
  //==============================
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  //==============================
  // BACK TO TOP
  //==============================
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#topBtn").fadeIn();
    } else {
      $("#topBtn").fadeOut();
    }
  });
  $("#topBtn").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600,
    );
  });
  //==============================
  // VALIDATE FORM LIÊN HỆ
  //==============================
  $("#contact-form").submit(function (e) {
    e.preventDefault();
    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let message = $("#message").val().trim();
    if (name === "") {
      alert("Vui lòng nhập họ tên!");
      $("#name").focus();
      return;
    }
    if (email === "") {
      alert("Vui lòng nhập email!");
      $("#email").focus();
      return;
    }
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ!");
      $("#email").focus();
      return;
    }
    if (message === "") {
      alert("Vui lòng nhập nội dung!");
      $("#message").focus();
      return;
    }
    alert("Gửi liên hệ thành công!");
    this.reset();
  });
});
