const createToolbarText = () => {
  const toolbarWrapper = document.createElement("div");
  const boldBtn = document.createElement("button");
  const italicBtn = document.createElement("button");
  const topBtn = document.createElement("button");
  const bottomBtn = document.createElement("button");
  const deleteRowBtn = document.createElement("button");
  const bold = document.createElement("img");
  const italic = document.createElement("img");
  const top = document.createElement("img");
  const bottom = document.createElement("img");
  const deleteRow = document.createElement("img");

  toolbarWrapper.setAttribute("class", "toolbar");
  toolbarWrapper.setAttribute("contenteditable", "false");
  toolbarWrapper.style.width = "250px";

  bold.setAttribute("title", "Bold");
  italic.setAttribute("title", "Italic");
  top.setAttribute("title", "Top");
  bottom.setAttribute("title", "Bottom");
  deleteRow.setAttribute("title", "Delete");

  bold.setAttribute("src", "img/bold.png");
  italic.setAttribute("src", "img/italic.png");
  top.setAttribute("src", "img/arrow-up.png");
  bottom.setAttribute("src", "img/arrow-down.png");
  deleteRow.setAttribute("src", "img/trash.png");

  boldBtn.addEventListener("click", formatDoc);
  italicBtn.addEventListener("click", formatDoc);
  topBtn.addEventListener("click", function () {
    goToTop(this);
  });
  bottomBtn.addEventListener("click", function () {
    goToBottom(this);
  });
  deleteRowBtn.addEventListener("click", function () {
    removeRow(this);
  });

  boldBtn.appendChild(bold);
  italicBtn.appendChild(italic);
  topBtn.appendChild(top);
  bottomBtn.appendChild(bottom);
  deleteRowBtn.appendChild(deleteRow);
  toolbarWrapper.appendChild(boldBtn);
  toolbarWrapper.appendChild(italicBtn);
  toolbarWrapper.appendChild(topBtn);
  toolbarWrapper.appendChild(bottomBtn);
  toolbarWrapper.appendChild(deleteRowBtn);

  return toolbarWrapper;
};

const createToolbarImage = (editFn) => {
  const toolbarWrapper = document.createElement("div");
  const editBtn = document.createElement("button");
  const topBtn = document.createElement("button");
  const bottomBtn = document.createElement("button");
  const deleteRowBtn = document.createElement("button");
  const edit = document.createElement("img");
  const top = document.createElement("img");
  const bottom = document.createElement("img");
  const deleteRow = document.createElement("img");

  toolbarWrapper.setAttribute("class", "toolbar");
  toolbarWrapper.setAttribute("contenteditable", "false");
  toolbarWrapper.style.width = "200px";

  edit.setAttribute("title", "Edit");
  top.setAttribute("title", "Top");
  bottom.setAttribute("title", "Bottom");
  deleteRow.setAttribute("title", "Delete");

  edit.setAttribute("src", "img/edit.png");
  top.setAttribute("src", "img/arrow-up.png");
  bottom.setAttribute("src", "img/arrow-down.png");
  deleteRow.setAttribute("src", "img/trash.png");

  editBtn.addEventListener("click", function () {
    editFn(this);
  });
  topBtn.addEventListener("click", function () {
    goToTop(this);
  });
  bottomBtn.addEventListener("click", function () {
    goToBottom(this);
  });
  deleteRowBtn.addEventListener("click", function () {
    removeRow(this);
  });

  editBtn.appendChild(edit);
  topBtn.appendChild(top);
  bottomBtn.appendChild(bottom);
  deleteRowBtn.appendChild(deleteRow);
  toolbarWrapper.appendChild(editBtn);
  toolbarWrapper.appendChild(topBtn);
  toolbarWrapper.appendChild(bottomBtn);
  toolbarWrapper.appendChild(deleteRowBtn);

  return toolbarWrapper;
};

const formatDoc = (sCmd, sValue) => {
  document.execCommand(sCmd.target.title.toLowerCase(), false, sValue);
};

const goToTop = (e) => {
  const container = e.closest(".holder");

  const order = parseInt(container.style.order);
  if (order > 1) {
    container.style.order = order - 1;
    container.previousElementSibling.style.order =
      parseInt(container.previousElementSibling.style.order) + 1;
  }
  ordered();
};

const goToBottom = (e) => {
  const container = e.closest(".holder");
  const order = parseInt(container.style.order) + 1;
  container.style.order = order;
  container.nextElementSibling.style.order = order - 1;

  ordered();
};

const removeRow = (e) => {
  const result = confirm("Are you sure to delete this box?");
  if (result) {
    const container = e.closest(".holder");
    document.querySelector(".main-container").removeChild(container);
    contentLoad();
  }
};

const editImage = (e) => {
  const container = e.closest(".holder");
  const img = container.querySelector(".img-wrap img");
  if (!container.querySelector("input.col-md-12")) {
    const row = document.createElement("div");
    const inputFile = document.createElement("input");
    const inputText = document.createElement("input");

    row.classList.add("row");

    inputFile.classList.add("col-md-6");
    inputFile.setAttribute("type", "file");
    inputFile.style.marginBottom = "20px";

    inputText.classList.add("col-md-6");
    inputText.setAttribute("type", "text");
    inputText.style.marginBottom = "20px";
    inputText.value = img.src.indexOf("base64") === -1 ? img.src : null;

    row.appendChild(inputFile);
    row.appendChild(inputText);

    inputFile.addEventListener("change", (event) => {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        img.src = event.target.result;
      });
      reader.readAsDataURL(file);
      container.removeChild(row);
    });

    inputText.addEventListener("paste", (event) => {
      img.src = event.clipboardData.getData("text");
      container.removeChild(row);
    });

    container.insertBefore(row, container.querySelector(".row"));
  }
};

const editTwoImages = (e) => {
  const container = e.closest(".holder.two-images");
  const images = document.querySelectorAll(".cursor-more");
  if (!container.querySelector(".row input.col-md-6")) {
    const rowFile = document.createElement("div");
    const rowText = document.createElement("div");
    const inputFileImage_1 = document.createElement("input");
    const inputFileImage_2 = document.createElement("input");
    const inputTextImage_1 = document.createElement("input");
    const inputTextImage_2 = document.createElement("input");

    rowFile.setAttribute("class", "row file");
    rowText.setAttribute("class", "row text");

    inputFileImage_1.classList.add("col-md-6");
    inputFileImage_1.setAttribute("type", "file");

    inputFileImage_1.style.marginTop = "20px";
    inputFileImage_1.style.marginBottom = "20px";
    inputFileImage_2.classList.add("col-md-6");
    inputFileImage_2.setAttribute("type", "file");

    inputFileImage_2.style.marginTop = "20px";
    inputFileImage_2.style.marginBottom = "20px";

    rowFile.appendChild(inputFileImage_1);
    rowFile.appendChild(inputFileImage_2);

    inputFileImage_1.addEventListener("change", (event) => {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        images[0].src = event.target.result;
      });
      reader.readAsDataURL(file);
      rowFile.removeChild(inputFileImage_1);
      if (!rowFile.contains(container.querySelector(".row.file input"))) {
        container.removeChild(rowFile);
      }
    });

    inputFileImage_2.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        images[1].src = event.target.result;
      });
      reader.readAsDataURL(file);
      rowFile.removeChild(inputFileImage_2);
      if (!rowFile.contains(container.querySelector(".row.file input"))) {
        container.removeChild(rowFile);
      }
    });

    inputTextImage_1.classList.add("col-md-6");
    inputTextImage_1.setAttribute("type", "file");

    inputTextImage_1.style.marginTop = "20px";
    inputTextImage_1.style.marginBottom = "20px";

    inputTextImage_2.classList.add("col-md-6");
    inputTextImage_2.setAttribute("type", "file");

    inputTextImage_2.style.marginTop = "20px";
    inputTextImage_2.style.marginBottom = "20px";

    rowText.appendChild(inputTextImage_1);
    rowText.appendChild(inputTextImage_2);

    inputTextImage_1.addEventListener("paste", (event) => {
      images[0].src = event.target.result;

      rowText.removeChild(inputTextImage_1);
      if (!rowText.contains(container.querySelector(".row.text input"))) {
        container.removeChild(rowText);
      }
    });

    inputTextImage_2.addEventListener("paste", (event) => {
      images[1].src = event.target.result;

      reader.readAsDataURL(file);
      if (!rowText.contains(container.querySelector(".row.text input"))) {
        rowText.removeChild(inputTextImage_2);
        container.removeChild(rowText);
      }
    });

    container.insertBefore(rowText, container.querySelector(".row.text"));
  }
};

const ordered = () => {
  const containers = document.querySelectorAll(".main-container .holder");

  const ordered = [...containers].sort((a, b) => a.style.order - b.style.order);
  ordered.forEach((element) => {
    document.querySelector(".main-container").appendChild(element);
  });
};

const addText = (e) => {
  const containers = document.querySelectorAll(".main-container .holder");
  const container = e.closest(".holder");
  const order = parseInt(container.style.order);
  const btns = buttons();
  const toolbarText = createToolbarText();

  const wrapper = document.createElement("div");
  const row = document.createElement("div");
  const col = document.createElement("div");
  const p = document.createElement("p");
  const input = document.createElement("input");

  wrapper.setAttribute("class", "holder container text");
  wrapper.contentEditable = true;
  wrapper.style.order = order - 1;
  wrapper.id = "id" + (order - 1);

  row.setAttribute("class", "row justify-content-center");

  col.setAttribute("class", "col-md-12 padding-top-bottom text-center");
  col.setAttribute(
    "data-scroll-reveal",
    "enter bottom move 30px over 0.5s after 0.2s"
  );

  p.setAttribute("class", "lead");
  p.setAttribute("tabindex", "1");

  input.type = "text";
  input.classList.add("text-input");

  col.appendChild(input);
  wrapper.addEventListener("click", function () {
    this.insertBefore(toolbarText, this.childNodes[0]);
    row.parentNode.insertBefore(btns, row.nextSibling);
    this.querySelectorAll(".toolbar")[0].style.display = "block";
    this.querySelectorAll(".toolbar")[1].style.display = "block";

    input.addEventListener(
      "keypress",
      function (e) {
        if (e.charCode === 13) {
          p.innerHTML = input.value;
          col.removeChild(input);
        }
      },
      false
    );
  });
  col.appendChild(p);
  row.appendChild(col);
  wrapper.appendChild(row);
  document.querySelector(".main-container").appendChild(wrapper);

  for (let i = 0; i < containers.length; i++) {
    if (parseInt(containers[i].style.order) >= parseInt(wrapper.style.order)) {
      containers[i].style.order = parseInt(containers[i].style.order) + 1;
      containers[i].id = "id" + parseInt(containers[i].style.order);
    }
  }
  ordered();
};

const addImage = (e, className) => {
  const containers = document.querySelectorAll(".main-container .holder");
  const container = e.closest(".holder");
  const order = parseInt(container.style.order);
  const wrapper = document.createElement("div");
  const inputFile = document.createElement("input");
  const inputText = document.createElement("input");
  const btns = buttons();
  const toolbarImage = createToolbarImage(editImage);

  wrapper.setAttribute("class", "holder " + className + " image");
  wrapper.contentEditable = true;
  wrapper.appendChild(inputFile);
  wrapper.appendChild(inputText);

  wrapper.style.order = order;
  wrapper.id = "id" + order;

  inputFile.classList.add("col-md-6");
  inputFile.setAttribute("type", "file");
  inputText.classList.add("col-md-6");
  inputText.setAttribute("type", "text");

  document.querySelector(".main-container").appendChild(wrapper);

  inputFile.addEventListener("change", (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      wrapper.appendChild(toolbarImage);
      wrapper.appendChild(createImage(event.target.result));
      wrapper.appendChild(btns);
      wrapper.querySelectorAll(".toolbar")[0].style.display = "block";
      wrapper.querySelectorAll(".toolbar")[1].style.display = "block";
    });
    reader.readAsDataURL(file);
    wrapper.removeChild(inputFile);
    wrapper.removeChild(inputText);
  });

  inputText.addEventListener("paste", (event) => {
    wrapper.appendChild(toolbarImage);
    wrapper.appendChild(createImage(event.clipboardData.getData("text")));
    wrapper.appendChild(btns);
    wrapper.querySelectorAll(".toolbar")[0].style.display = "block";
    wrapper.querySelectorAll(".toolbar")[1].style.display = "block";
    wrapper.removeChild(inputFile);
    wrapper.removeChild(inputText);
  });

  for (let i = 0; i < containers.length; i++) {
    if (parseInt(containers[i].style.order) >= parseInt(wrapper.style.order)) {
      containers[i].style.order = parseInt(containers[i].style.order) + 1;
      containers[i].id = "id" + parseInt(containers[i].style.order);
    }
  }
  ordered();
};

const addTwoImages = (e) => {
  const containers = document.querySelectorAll(".main-container .holder");
  const container = e.closest(".holder");
  const order = parseInt(container.style.order);
  const wrapper = document.createElement("div");
  const inputFileImage_1 = document.createElement("input");
  const inputFileImage_2 = document.createElement("input");
  const inputTextImage_1 = document.createElement("input");
  const inputTextImage_2 = document.createElement("input");
  const row = document.createElement("div");
  const btns = buttons();
  const toolbarTwoImages = createToolbarImage(editTwoImages);

  wrapper.setAttribute("class", "holder container two-image");
  wrapper.contentEditable = true;
  wrapper.appendChild(inputFileImage_1);
  wrapper.appendChild(inputFileImage_2);
  wrapper.appendChild(inputTextImage_1);
  wrapper.appendChild(inputTextImage_2);

  wrapper.style.order = order;
  wrapper.id = "id" + order;

  inputFileImage_1.classList.add("col-md-6");
  inputFileImage_1.setAttribute("type", "file");

  inputFileImage_2.classList.add("col-md-6");
  inputFileImage_2.setAttribute("type", "file");

  inputTextImage_1.classList.add("col-md-6");
  inputTextImage_1.setAttribute("type", "text");

  inputTextImage_2.classList.add("col-md-6");
  inputTextImage_2.setAttribute("type", "text");

  row.setAttribute("class", "row justify-content-center");

  inputFileImage_1.addEventListener("change", (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      row.appendChild(
        createCustomImage(event.target.result, file.name, "col-md-6")
      );
    });
    reader.readAsDataURL(file);
    wrapper.removeChild(inputFileImage_1);
  });

  inputFileImage_2.addEventListener("change", (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      row.appendChild(
        createCustomImage(
          event.target.result,
          file.name,
          "col-md-6 mt-4 mt-md-0"
        )
      );
    });
    reader.readAsDataURL(file);
    wrapper.removeChild(inputFileImage_2);
  });

  inputTextImage_1.addEventListener("paste", (event) => {
    row.appendChild(
      createCustomImage(
        event.clipboardData.getData("text"),
        event.clipboardData.getData("text"),
        "col-md-6"
      )
    );

    wrapper.removeChild(inputTextImage_1);
  });

  inputTextImage_2.addEventListener("paste", (event) => {
    row.appendChild(
      createCustomImage(
        event.clipboardData.getData("text"),
        event.clipboardData.getData("text"),
        "col-md-6 mt-4 mt-md-0"
      )
    );
    wrapper.removeChild(inputTextImage_2);
  });

  wrapper.addEventListener("change", function () {
    if (this.querySelectorAll(".image-full").length) {
      this.insertBefore(toolbarTwoImages, this.childNodes[0]);
      row.parentNode.insertBefore(btns, row.nextSibling);
      wrapper.querySelectorAll(".toolbar")[0].style.display = "block";
      wrapper.querySelectorAll(".toolbar")[1].style.display = "block";
    }
  });

  wrapper.appendChild(row);

  document.querySelector(".main-container").appendChild(wrapper);

  for (let i = 0; i < containers.length; i++) {
    if (parseInt(containers[i].style.order) >= parseInt(wrapper.style.order)) {
      containers[i].style.order = parseInt(containers[i].style.order) + 1;
      containers[i].id = "id" + parseInt(containers[i].style.order);
    }
  }
  ordered();
};

const createImage = (url) => {
  const row = document.createElement("div");
  const col = document.createElement("div");
  const wrap = document.createElement("div");
  const image = document.createElement("img");

  row.setAttribute("class", "row justify-content-center");

  col.setAttribute("class", "col-md-12 padding-top-bottom text-center");
  col.setAttribute(
    "data-scroll-reveal",
    "enter bottom move 30px over 0.5s after 0.2s"
  );

  wrap.classList.add("img-wrap");

  image.classList.add("image-full");
  image.src = url;

  wrap.appendChild(image);
  col.appendChild(wrap);
  row.appendChild(col);
  return row;
  // image.addEventListener("load", (e) => {
  //   if (image.height <= 615 && image.width <= 1885) {
  //   } else {
  //     alert("This image can not be applyed! Please try with another!");
  //   }
  // });
};

const createCustomImage = (url, href, className) => {
  const col = document.createElement("div");
  const link = document.createElement("a");
  const wrap = document.createElement("div");
  const image = document.createElement("img");

  col.setAttribute("class", className);

  link.setAttribute("data-fancybox", "gallery");
  link.classList.add("cursor-link");

  wrap.classList.add("img-wrap");

  image.classList.add("cursor-more");

  link.href = href;
  image.classList.add("image-full");
  image.src = url;

  wrap.appendChild(image);
  link.appendChild(wrap);
  col.appendChild(link);
  return col;
};

const save = () => {
  document.getElementById("result").textContent = document.querySelector(
    ".main-container"
  ).outerHTML;
};

const buttons = () => {
  const holderBtn = document.createElement("div");
  const textBtn = document.createElement("button");
  const fullsizeImageBtn = document.createElement("button");
  const imageBtn = document.createElement("button");
  const twoImagesBtn = document.createElement("button");
  const textImg = document.createElement("img");
  const fullsizeImg = document.createElement("img");
  const img = document.createElement("img");
  const twoImg = document.createElement("img");

  holderBtn.classList.add("toolbar");

  holderBtn.style.width = "200px";

  textBtn.classList.add("add-text-btn");
  fullsizeImageBtn.classList.add("add-image-fullsize-btn");
  imageBtn.classList.add("add-image-normalsize-btn");
  twoImagesBtn.classList.add("add-two-images-btn");

  textImg.src = "img/text.png";
  fullsizeImg.src = "img/fullsize.png";
  img.src = "img/normal.png";
  twoImg.src = "img/two-images.png";

  textImg.title = "Add text";
  fullsizeImg.title = "Add fullsize image";
  img.title = "Add normalsize image";
  twoImg.title = "Add two images";

  textImg.alt = "Add text";
  fullsizeImg.alt = "Add fullsize image";
  img.alt = "Add normalsize image";
  twoImg.alt = "Add two images";

  textBtn.addEventListener("click", function () {
    addText(this);
  });
  fullsizeImageBtn.addEventListener("click", function () {
    addImage(this, "container-fluid");
  });
  imageBtn.addEventListener("click", function () {
    addImage(this, "container");
  });
  twoImagesBtn.addEventListener("click", function () {
    addTwoImages(this);
  });

  textBtn.appendChild(textImg);
  fullsizeImageBtn.appendChild(fullsizeImg);
  imageBtn.appendChild(img);
  twoImagesBtn.appendChild(twoImg);

  holderBtn.appendChild(textBtn);
  holderBtn.appendChild(fullsizeImageBtn);
  holderBtn.appendChild(imageBtn);
  holderBtn.appendChild(twoImagesBtn);

  return holderBtn;
};

const contentLoad = () => {
  const holders = document.querySelectorAll(".main-container .holder");

  const btns = buttons();
  const toolbarText = createToolbarText();
  const toolbarImage = createToolbarImage(editImage);
  const toolbarTwoImages = createToolbarImage(editTwoImages);
  for (let i = 0; i < holders.length; i++) {
    holders[i].setAttribute("contenteditable", "true");
    holders[i].style.order = i + 1;
    holders[i].id = "id" + (i + 1);
    holders[i].addEventListener("click", function () {
      for (let j = 0; j < holders.length; j++) {
        if (holders[j].children[0].classList.contains("toolbar")) {
          holders[j].removeChild(holders[j].children[0]);
        }
      }
      this.appendChild(btns);
      if (this.classList.contains("text")) {
        this.insertBefore(toolbarText, this.childNodes[0]);
      }
      if (this.classList.contains("image")) {
        this.insertBefore(toolbarImage, this.childNodes[0]);
      }
      if (this.classList.contains("two-images")) {
        this.insertBefore(toolbarTwoImages, this.childNodes[0]);
      }
      this.querySelectorAll(".toolbar")[0].style.display = "block";
      this.querySelectorAll(".toolbar")[1].style.display = "block";
    });
  }
};

document.getElementById("save-btn").addEventListener("click", save);
window.addEventListener("load", contentLoad);
