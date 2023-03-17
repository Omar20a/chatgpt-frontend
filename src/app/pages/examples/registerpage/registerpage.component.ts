import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html"
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  answer;
  askForm;
  focus2;
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }

  createForm() {
    this.askForm = this.fb.group({
      city: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.createForm();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);
  }


  getDate(today) {
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var date = mm + '/' + dd + '/' + yyyy;
    return date;
  }

  //count how many days between from and to date
  countDays() {
    var from = this.getDate(this.askForm.value.from);
    var to = this.getDate(this.askForm.value.to);
    var date1 = new Date(from);
    var date2 = new Date(to);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days + 1;
  }


  onSubmit() {
    var question = "I need plan for " + this.countDays() + " days in " + this.askForm.value.city + " as html format";
    console.log(question);

    var response = this.http.post("https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0.9
      }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      }
    })
      .subscribe(
        (val) => {
          console.log(val);

          this.answer = val;
          this.answer = this.answer.choices[0].text
          console.log(this.answer);

        });

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
