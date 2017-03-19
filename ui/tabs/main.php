<div class="container-fluid">
<section id="jobs-layout-parent" class="animated fadeIn">
  <div class="row">
    <div class="col-sm-12">
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#new-enquiry" aria-controls="new enquiry" role="tab" data-toggle="tab">New Enquiry <span id="new-enquiry-counter" class="badge">0</span></a></li>
    <li role="presentation"><a href="#quote-given" aria-controls="quote given" role="tab" data-toggle="tab">Quote Given <span id="quote-given-counter" class="badge">0</span></a></li>
    <li role="presentation"><a href="#current-job" aria-controls="current job" role="tab" data-toggle="tab">Current Jobs <span id="current-job-counter" class="badge">0</span></a></li>
    <li role="presentation"><a href="#awaiting-invoice" aria-controls="awaiting invoice" role="tab" data-toggle="tab">Awaiting Invoice <span id="awaiting-invoice-counter" class="badge">0</span></a></li>
    <li role="presentation"><a href="#invoice-sent" aria-controls="invoice sent" role="tab" data-toggle="tab">Invoice Sent <span id="invoice-sent-counter" class="badge">0</span></a></li>
    <li role="presentation"><a href="#invoice-paid" aria-controls="invoice paid" role="tab" data-toggle="tab">Invoice Paid <span id="invoice-paid-counter" class="badge">0</span></a></li>
    <li role="presentation"><a id="archive-tab" href="#archive" aria-controls="archive" role="tab" data-toggle="tab">Archive</a></li>
  </ul>
</div>
</div>

  <div class="row">
  <div class="col-sm-12">
  <hr>
  </div>
</div>

  <div class="row">
    <div class="col-sm-12">
  <!-- Tab panes -->
  <div class="tab-content jobs-list">
    <div role="tabpanel" class="tab-pane active" id="new-enquiry"><?php require __DIR__."/panes/new-enquiry.php"; ?></div>
    <div role="tabpanel" class="tab-pane" id="quote-given"><?php require __DIR__."/panes/quote-given.php"; ?></div>
    <div role="tabpanel" class="tab-pane" id="current-job"><?php require __DIR__."/panes/current-job.php"; ?></div>
    <div role="tabpanel" class="tab-pane" id="awaiting-invoice"><?php require __DIR__."/panes/awaiting-invoice.php"; ?></div>
    <div role="tabpanel" class="tab-pane" id="invoice-sent"><?php require __DIR__."/panes/invoice-sent.php"; ?></div>
    <div role="tabpanel" class="tab-pane" id="invoice-paid"><?php require __DIR__."/panes/invoice-paid.php"; ?></div>
    <div role="tabpanel" class="tab-pane" id="archive"><?php require __DIR__."/panes/archive.php"; ?></div>
  </div>

</div>
</div>
</section>
</div>
<div class="container-fluid">
<section id="reporting-layout-parent" class="animated fadeIn hide">
  <div class="row">
    <div class="col-sm-12">
      <h2>Reporting</h2>
        <?php require __DIR__."/reports/currentJobsReport.php"; ?>
    </div>
  </div>
</section>
</div>