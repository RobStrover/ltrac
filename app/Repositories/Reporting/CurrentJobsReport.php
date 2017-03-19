<?php namespace Repositories\Reporting;

use Repositories\Job\Reading\GetOnlyCurrentJobs as GetCurrentJobs;

class CurrentJobsReport
{
    public function __construct()
    {
        $this->generateCurrentJobsReport();
    }

    public function generateCurrentJobsReport() {

        $GetJobCurrent = new GetCurrentJobs();
        $currentJobs = $GetJobCurrent->getOnlyCurrentJobs();
        $CurrentJobsReport = new \PhpOffice\PhpWord\PhpWord();

        $tableStyle = array(
            'width' => '100%'
        );

        $headerCellStyle = array(
            'bgColor' => 'F2F2F2',
            'borderBottomColor' => '#333333',
            'borderLeftColor' => '#333333',
            'borderRightColor' => '#333333',
            'borderTopColor' => '#333333',
            'borderBottomSize' => '1',
            'borderLeftSize' => '1',
            'borderRightSize' => '1',
            'borderTopSize' => '1',
            'cellMargin'  => 50
        );

        $standardCellStyle = array(
            'borderBottomColor' => '#333333',
            'borderLeftColor' => '#333333',
            'borderRightColor' => '#333333',
            'borderTopColor' => '#333333',
            'borderBottomSize' => '1',
            'borderLeftSize' => '1',
            'borderRightSize' => '1',
            'borderTopSize' => '1',
            'cellMargin'  => 50
        );

        $jobSection = $CurrentJobsReport->addSection();

        foreach ($currentJobs as $currentJob) {

            $jobTable = $jobSection->addTable($tableStyle);

            $jobIdRow = $jobTable->addRow();
            $jobIdRow->addCell(2000, $headerCellStyle)->addText('LTRAC Job');
            $jobIdCell = $jobIdRow->addCell(8000, $standardCellStyle);
            $jobIdCell->addText('#' . $currentJob['job_id'] . ' - ' . $currentJob['job_name']);
            $jobIdCell->getStyle()->setGridSpan(3);

            $jobDateRow = $jobTable->addRow();
            $jobDateRow->addCell(2000, $headerCellStyle)->addText('Date');
            $jobDataCell = $jobDateRow->addCell(8000, $standardCellStyle);
            $jobDataCell->addText($currentJob['job_status_current_job_date']);
            $jobDataCell->getStyle()->setGridSpan(3);

            $jobCompanyNameRow = $jobTable->addRow();
            $jobCompanyNameRow->addCell(2000, $headerCellStyle)->addText('Company Name');
            $jobCompanyNameCell = $jobCompanyNameRow->addCell(8000, $standardCellStyle);
            $jobCompanyNameCell->addText('');
            $jobCompanyNameCell->getStyle()->setGridSpan(3);

            $jobCompanyContactRow = $jobTable->addRow();
            $jobCompanyContactRow->addCell(2000, $headerCellStyle)->addText('Company Contact');
            $jobCompanyContactRow->addCell(3000, $standardCellStyle)->addText('');
            $jobCompanyContactRow->addCell(2000, $headerCellStyle)->addText('Contact Number');
            $jobCompanyContactRow->addCell(3000, $standardCellStyle)->addText('');

            $jobAddressRow = $jobTable->addRow();
            $jobAddressRow->addCell(2000, $headerCellStyle)->addText('Site Address');
            $jobAddressCell = $jobAddressRow->addCell(8000, $standardCellStyle);
                $jobAddressCell->addText($currentJob['job_site_address_line_1']);
                $jobAddressCell->addText($currentJob['job_site_address_line_2']);
                $jobAddressCell->addText($currentJob['job_site_address_town']);
                $jobAddressCell->addText($currentJob['job_site_address_city']);
                $jobAddressCell->addText($currentJob['job_site_address_postcode']);
            $jobAddressCell->getStyle()->setGridSpan(3);

            $jobSiteContactRow = $jobTable->addRow();
            $jobSiteContactRow->addCell(2000, $headerCellStyle)->addText('Site Contact');
            $jobSiteContactRow->addCell(3000, $standardCellStyle)->addText($currentJob['job_site_contact_name']);
            $jobSiteContactRow->addCell(2000, $headerCellStyle)->addText('Site Contact Number');
            $jobSiteContactRow->addCell(3000, $standardCellStyle)->addText($currentJob['job_site_contact_number']);

            $jobPreferredDateTimeRow = $jobTable->addRow();
            $jobPreferredDateTimeRow->addCell(2000, $headerCellStyle)->addText('Preferred Time');
            $jobPreferredDateTimeCell = $jobPreferredDateTimeRow->addCell(8000, $standardCellStyle);
            $jobPreferredDateTimeCell->addText($currentJob['job_preferred_date_time']);
            $jobPreferredDateTimeCell->getStyle()->setGridSpan(3);

            $jobDescriptionRow = $jobTable->addRow();
            $jobDescriptionRow->addCell(2000, $headerCellStyle)->addText('Specification');
            $jobDescriptionCell = $jobDescriptionRow->addCell(8000, $standardCellStyle);
            $jobDescriptionCell->addText($currentJob['job_description']);
            $jobDescriptionCell->getStyle()->setGridSpan(3);

            $jobPriceRow = $jobTable->addRow();
            $jobPriceRow->addCell(2000, $headerCellStyle)->addText('Price');
            $jobPriceCell = $jobPriceRow->addCell(8000, $standardCellStyle);
            $jobPriceCell->addText('£' . $currentJob['job_price'] . ' plus VAT');
            $jobPriceCell->getStyle()->setGridSpan(3);

            $jobSection->addTextBreak(2);

        }

            $dateNow = new \DateTime('NOW');
            $file = 'current-jobs-'.$dateNow->format('d-m-Y').'.docx';
            header("Content-Description: File Transfer");
            header('Content-Disposition: attachment; filename="' . $file . '"');
            header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            header('Content-Transfer-Encoding: binary');
            header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
            header('Expires: 0');
            $xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($CurrentJobsReport, 'Word2007');
            $xmlWriter->save("php://output");
    }

}