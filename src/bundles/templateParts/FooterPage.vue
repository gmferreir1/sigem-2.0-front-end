<template>

  <footer class="content-footer">

    <nav class="footer-right">
      <ul class="nav">
        <li>
          <a href="javascript:;">Feedback</a>
        </li>
        <li>
          <a href="javascript:;" class="scroll-up">
            <i class="fa fa-angle-up"></i>
          </a>
        </li>
      </ul>
    </nav>

    <nav class="footer-left">
      <ul class="nav">
        <li>
          <a href="javascript:;">Copyright <i class="fa fa-copyright"></i> <span>SIGEM (Master RSM Imóveis)</span> {{year_current}}. Todos os Direitos Reservados</a>
        </li>
      </ul>
    </nav>

  </footer>

</template>

<script>
export default {
  data () {
    return {
      year_current: moment().format('YYYY')
    }
  }
}
</script>