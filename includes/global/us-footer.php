    <section class="card">
      <div class="card-body">
        <div class="inner-container">
            <h3 class="text-center text-uppercase">Help Elect Peter</h3>
            <p class="text-center subheading">It's time to build a better California</p>
            <form id="join_page_new_signup_form" class="ajaxForm signup_form" method="POST" action="/forms/signups" enctype="multipart/form-data">

              <input name="authenticity_token" type="hidden" value="">
              <input name="page_id" type="hidden" value="<?php echo $page_id; ?>">
              <input name="return_to" type="hidden" value="http://www.Valentino4gov.org/">

            
            <div class="row">
              <div class="col s12 m4">
                <input class="text form-control form-control-lg" id="signup_email" name="signup[email]" placeholder="email address" type="email">
              </div>
              <div class="col s12 m4">
                <input class="text form-control form-control-lg" id="signup_home_address_zip" name="signup[home_address_attributes][zip]" placeholder="zip" type="text" value="">
              </div>
              <div class="col s12 m4">
                <input class="btn btn-info btn-lg btn-block" type="submit" name="commit" value="Act Now">
              </div>
            </div>
          </form>
        </div>
      </div>
    </section><!-- end card -->
  </div>
    <footer>
    <div class="inner-container">
      <div class="social">
        <a href="#" target="_blank" id="facebook">Facebook</a>
        <a href="#" target="_blank" id="youtube">YouTube</a>
      </div>
        <p class="copyright">&copy;<?php echo date("Y");?> Valentino4Gov - All Rights Reserved</p>
        <div class="footer-links"><a href="privacy.php">Privacy</a></div>
      </div>
    </footer>
  </div>
  <script src="js/global-scripts-tail.js" type="text/javascript"></script>
</body>
</html>