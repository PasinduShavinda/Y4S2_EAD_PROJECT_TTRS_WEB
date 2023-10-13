import React from 'react'

const Homepage = () => {
  return (
    <div>
      <div class="hero_area">
    {/* <!-- header section strats --> */}
    <header class="header_section">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container">
          <a class="navbar-brand" href="index.html">
            <span>
            Sri Lanka Railways
            </span>
          </a>

          <div class="navbar-collapse" id="">
            <div class="user_option">
              <a href="/TMHome">
                <button>Login</button>
              
              </a>
            </div>
            <div class="custom_menu-btn">
              <button onclick="openNav()">
                <span class="s-1"> </span>
                <span class="s-2"> </span>
                <span class="s-3"> </span>
              </button>
            </div>
            <div id="myNav" class="overlay">
              <div class="overlay-content">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="car.html">Cars</a>
                <a href="blog.html">Blog</a>
                <a href="contact.html">Contact Us</a>
                <a href="#">Login</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
    {/* <!-- end header section -->
    <!-- slider section --> */}
    <section class=" slider_section position-relative">
      <div class="slider_container">
        <div class="img-box">
          <img src="images/Nine_Arch.jpg" alt=""/>
        </div>
        <div class="detail_container">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="detail-box">
                  <h1>
                  Welcome to <br/>
                  Sri Lanka <br/>
                  Railways
                      
                  </h1>
                  <p >Online Advance Train Seats Reservation</p>
                  <a href="/admin">
                    <button>
                    Book Your Seats
                    </button>
                 
                  
                  </a>
                </div>
              </div>
              <div class="carousel-item">
                <div class="detail-box">
                <h1>
                  Welcome to <br/>
                  Sri Lanka <br/>
                  Railways
                      
                  </h1>
                  <p >Online Advance Train Seats Reservation</p>
                  <a href="/admin">
                    <button>
                    Book Your Seats
                    </button>
                 
                  
                  </a>
                </div>
              </div>
              <div class="carousel-item">
                <div class="detail-box">
                <h1>
                  Welcome to <br/>
                  Sri Lanka <br/>
                  Railways
                      
                  </h1>
                  <p >Online Advance Train Seats Reservation</p>
                  <a href="/admin">
                    <button>
                    Book Your Seats
                    </button>
                 
                  
                  </a>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="sr-only">Next</span>
            </a>
          </div>

        </div>
      </div>
    </section>
    {/* <!-- end slider section --> */}
  </div>
  {/* <!-- book section --> */}

  

  {/* <!-- end car section -->

  <!-- about section --> */}

  <section class="about_section layout_padding-bottom">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-7 px-0">
          <div class="img-box">
            <img src="images/indian-train-removebg-preview.png" alt=""/>
          </div>
        </div>
        <div class="col-md-4 col-lg-3">
          <div class="detail-box">
            <h2>
            See Sri Lanka by train...
            </h2>
            <p>
            Sri Lanka is a fabulous place, safe, friendly and remarkably hassle-free.  Sri Lanka's railways are a great way to get around and a real cultural experience.  The most scenic routes will be highlights of your visit, in particular the wonderful journey from Colombo to Kandy and up into Tea Country and the coastal train from Colombo to Dutch colonial Galle.  British visitors will find the stations, signal boxes and old red semaphore signals very familiar!  This page is a beginner's guide to train travel in Sri Lanka.
            </p>
            <a href="">
              <button>
              Read More
              </button>
             
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- end about section -->


  <!-- best section --> */}

  <section class="best_section">
    <div class="container">
      <div class="book_now">
        <div class="detail-box">
          <h2>
            Gallery
          </h2>
          <p>
            It is a long established fact that a reader will be distracted by the
          </p>
        </div>
        <div class="btn-box">
          <a href="">
            Book Now
          </a>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- end best section -->

  <!-- rent section --> */}

  <section class="rent_section layout_padding">
    <div class="container">
      <div class="rent_container">
        <div class="box">
          <div class="img-box">
            <img src="images/G1.jpg" alt=""/>
          </div>
         
        </div>
        <div class="box">
          <div class="img-box">
            <img src="images/G2.jpg" alt=""/>
          </div>
        
        </div>
        <div class="box">
          <div class="img-box">
            <img src="images/G3.jpeg" alt=""/>
          </div>
          
        </div>
        <div class="box">
          <div class="img-box">
            <img src="images/G4.jpg" alt=""/>
          </div>
          
        </div>
        <div class="box">
          <div class="img-box">
            <img src="images/G5.jpg" alt=""/>
          </div>
        
        </div>
        <div class="box">
          <div class="img-box">
            <img src="images/G6.jpg" alt=""/>
          </div>
         
        </div>
      </div>
      <div class="btn-box">
        <a href="">
          See More
        </a>
      </div>
    </div>
  </section>


  {/* <!-- end rent section -->


  <!-- blog section --> */}

  <section class="blog_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h2>
          History
        </h2>
        <p>
        Rail was introduced in Sri Lanka in 1864 to transport coffee from plantations in the hill country district of Kandy to the port city of Colombo on its way to Europe and the world market. The coffee blight of 1871 destroyed many a fine plantation and tea replaced coffee. With the development of tea plantations in the 1880s, the joint-stock companies swallowed up the former individual proprietorship of the coffee era. Under corporate ownership and management control by companies, the process of production of tea became more sophisticated and needed more and more railways built to the Kandyan highlands. To send tea to Colombo and to transport labour, machinery, manure, rice, and foodstuff, etc to Kandy, another 100 miles of railways were constructed in the tea planting districts to serve the expanding tea domain.

To serve the coconut plantations flourishing in the west, southwest and northwest coastal areas of the country, and the wet inland rubber plantations below the tea belt, railway lines were built in the wake of these agricultural developments. Thereafter, the need for cheap and safe travel in order to open up the hinterland of the country led to the expansion of the railway.

An extension of the Main Line to Kandy was made north to the ancient city of Anuradhapura, going further north to Kankesanturai and west to Talaimannar to connect the island with South India by ferry, to bring Indian labour for the tea and rubber plantations, and also import rice and other food stuffs not indigenously produced in sufficient quantities.

Towards the east, there was little economic justification to lay a line to the dry zone in that direction, but it became strategically worthwhile to lay a line to the natural harbour of Trincomalee and also connect it to the provincial capital of Batticaloa. These lines were laid with light (21 kg) section rails, as was the narrow gauge section to serve the rubber plantations east of Colombo, known as the Kelani Valley Line.

Up country, a similar branch line was laid from Nanu Oya on the Main Line through very difficult terrain to serve the tea plantations around Nuwara Eliya. Track alignment was defined in this section about 140 years ago, when economic considerations were vastly different. The railways achieved modal superiority with speeds of 25 to 40 kmph in the hill country and 65 to 80 in the low country. Civil engineering criteria was influenced by the economic need to minimize cuts and fills, permitting gradients to 2 to 3 % and minimizing bridge lengths. As a result, the alignment here is winding with very sharp curves.

In the early days of the railways, the bulk of the freight was carried to the port of Colombo and as the port expanded, rail lines were laid to serve every pier.
        </p>
      </div>
    </div>
    <div class="blog_container">
      <div class="layout_padding2-top">
        <div class="carousel-wrap ">
          <div class="owl-carousel">
            <div class="item">
              <div class="box">
                <div class="date-box">
                  <h6>
                    04 Nov 2019
                  </h6>
                </div>
                <div class="img-box">
                  <img src="images/b-1.jpg" alt=""/>
                </div>
                <div class="detail-box">
                  <h5>
                    Vintage
                  </h5>
                  <p>
                    It is a long established fact that a reader will be distracted by the readable The point of using Lorem </p>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="box">
                <div class="date-box">
                  <h6>
                    04 Nov 2019
                  </h6>
                </div>
                <div class="img-box">
                  <img src="images/b-2.jpg" alt=""/>
                </div>
                <div class="detail-box">
                  <h5>
                    Steering wheels
                  </h5>
                  <p>
                    It is a long established fact that a reader will be distracted by the readable The point of using Lorem </p>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="box">
                <div class="date-box">
                  <h6>
                    04 Nov 2019
                  </h6>
                </div>
                <div class="img-box">
                  <img src="images/b-3.jpg" alt=""/>
                </div>
                <div class="detail-box">
                  <h5>
                    Buick Car
                  </h5>
                  <p>
                    It is a long established fact that a reader will be distracted by the readable The point of using Lorem </p>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="box">
                <div class="date-box">
                  <h6>
                    04 Nov 2019
                  </h6>
                </div>
                <div class="img-box">
                  <img src="images/b-2.jpg" alt=""/>
                </div>
                <div class="detail-box">
                  <h5>
                    Steering wheels
                  </h5>
                  <p>
                    It is a long established fact that a reader will be distracted by the readable The point of using Lorem </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- end blog section -->

  

  {/* <!-- end us section -->

  <!-- client section --> */}

  

  

  <section class="contact_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h2>
          Request A call back
        </h2>
      </div>
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div class="form_container">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input type="text" class="form-control" id="inputName4" placeholder="Name "/>
                </div>
                <div class="form-group col-md-6">
                  <input type="text" class="form-control" id="inputSubject4" placeholder="Phone"/>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <input type="email" class="form-control" id="inputEmail4" placeholder="Email id"/>
                </div>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" id="inputMessage" placeholder="Message"/>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="contact_items">

        <a href="">
          <div class="img-box">
            <img src="images/location.png" alt=""/>
          </div>
          <h6>
            Loram Ipusum ari
            lo elisant na
          </h6>
        </a>
        <a href="">
          <div class="img-box">
            <img src="images/call.png" alt=""/>
          </div>
          <h6>
            (+12 1234456789)
          </h6>
        </a>
        <a href="">
          <div class="img-box">
            <img src="images/mail.png" alt=""/>
          </div>
          <h6>
            demo@gmail.com
          </h6>
        </a>

      </div>
      <div class="social_container">
        <div class="social-box">
          <div>
            <a href="">
              <img src="images/fb.png" alt=""/>
            </a>
          </div>
          <div>
            <a href="">
              <img src="images/twitter.png" alt=""/>
            </a>
          </div>
          <div>
            <a href="">
              <img src="images/linkedin.png" alt=""/>
            </a>
          </div>
          <div>
            <a href="">
              <img src="images/insta.png" alt=""/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- end contact section -->

  <!-- map section --> */}

  


  {/* <!-- end map section -->

  <!-- footer section --> */}

    </div>
  )
}

export default Homepage
