<?php namespace Repositories\Job\Reading;

use Repositories\Db\Connection\GetConnection as Connection;

class GetJobInvoice
{
    public function __construct($jobId)
    {
        $this->generateJobInvoice($jobId);
    }

    public function  generateJobInvoice($jobId)
    {
        $DbConnection = new Connection();
        if(null !== $DbConnection->connection) {
            $jobQuery = sprintf("SELECT * FROM job WHERE job_id = '%d'", $jobId);
            $result = $DbConnection->connection->query($jobQuery);
            $singleJob = mysqli_fetch_all($result,MYSQLI_ASSOC);
            $singleJob = $singleJob[0];

            $jobInvoice = new \PhpOffice\PhpWord\PhpWord();

            $pageSection = $jobInvoice->addSection();

            $pageSection->addTitle(
                'THE LINEMASTER'
            );

            $pageSection->addText(
                'Independent Linemarking Contractor'
            );

            $pageSection->addText(
                '01375 675308 | 07860 841217'
            );

            $pageSection->addText(
                '2 Prospect Avenue, Stanford-Le-Hope, Essex, SS170NH'
            );

            $pageSection->addText(
                'thelinemaster@aol.com | www.thelinemaster.co.uk'
            );



            $pageSection->addText(
//                !empty($singleJob['job_site_address_line_1']) ? $singleJob['job_site_address_line_1'] : 'Job Address Line 1'
                'Payment Address Line 1 Here'
            );

            $pageSection->addText(
//                !empty($singleJob['job_site_address_line_2']) ? $singleJob['job_site_address_line_2'] : 'Job Address Line 2'
                'Payment Address Line 2 Here'
            );

            $pageSection->addText(
//                !empty($singleJob['job_site_address_town']) ? $singleJob['job_site_address_town'] : 'Job Address Town'
                'Payment Address Town Here'
            );

            $pageSection->addText(
//                !empty($singleJob['job_site_address_city']) ? $singleJob['job_site_address_city'] : 'Job Address City'
                'Payment Address City Here'
            );

            $pageSection->addText(
//                !empty($singleJob['job_site_address_postcode']) ? $singleJob['job_site_address_postcode'] : 'Job Address Postcode'
                'Payment Address Postcode Here'
            );

            $pageSection->addTextBreak(2);

            $pageSection->addText(
              'Invoice No: '
            );

            $pageSection->addText(
                'Ordered By: JOB CONTACT NAME / Order Number: ' . $singleJob['job_purchase_order_number']
            );

            $pageSection->addText(
                'Linemarking at: '
                . !empty($singleJob['job_site_address_line_1']) ? $singleJob['job_site_address_line_1'] . ',' : ''
                . !empty($singleJob['job_site_address_line_2']) ? $singleJob['job_site_address_line_2'] . ',' : ''
                . !empty($singleJob['job_site_address_town']) ? $singleJob['job_site_address_town'] . ',' : ''
                . !empty($singleJob['job_site_address_city']) ? $singleJob['job_site_address_city'] . ',' : ''
                . !empty($singleJob['job_site_address_postcode']) ? $singleJob['job_site_address_postcode'] . ',' : ''
            );

            $pageSection->addText(
                !empty($singleJob['job_description']) ? $singleJob['job_description'] : ''
            );

            $pageSection->addTextBreak();

            $pageSection->addText(
                'Total Cost' . !empty($singleJob['job_price']) ? '£' . $singleJob['job_price'] : ''
            );

            $pageSection->addTextBreak();

            $pageSection->addText(
                'Total Cost ' . !empty($singleJob['job_price']) ? '£' . $singleJob['job_price'] : ''
            );

            $pageSection->addTextBreak();

            $pageSection->addText(
                'VAT @ 20% ' . !empty($singleJob['job_price']) ? '£' . ($singleJob['job_price'] * 0.20) : ''
            );

            $pageSection->addTextBreak();

            $pageSection->addText(
                'Total ' . !empty($singleJob['job_price']) ? '£' . ($singleJob['job_price'] * 1.20) : ''
            );

            $pageSection->addTextBreak();

            $pageSection->addText(
                'Payment strictly within '
                . $singleJob['job_payment_terms_number']
                . ' '
                . $singleJob['job_payment_terms_denomination']
                . ' of invoice date.'
            );

            $pageSection->addTextBreak();

            $pageSection->addText(
                'Taxpayer Mr S K L Capon T/A The Linemaster'
            );

            $pageSection->addText(
                'UTR: 12880 34954 | NI No: YW067404C | VAT Registration No: 726124357'
            );

            $pageSection->addTextBreak();

            $pageSection->addText(
                'NatWest Bank'
            );

            $pageSection->addText(
                '132 High Street'
            );

            $pageSection->addText(
                'Southend on Sea'
            );

            $pageSection->addText(
                'Sort Code: 555028 | Account Number: 95131841'
            );

            $pageSection->addText(
                'Account Name: SKL Capon t/a The Linemaster'
            );

            $dateNow = new \DateTime('NOW');
            $file = 'job-' . $singleJob['job_id'] . '-invoice-' .$dateNow->format('d-m-Y').'.docx';
            header("Content-Description: File Transfer");
            header('Content-Disposition: attachment; filename="' . $file . '"');
            header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            header('Content-Transfer-Encoding: binary');
            header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
            header('Expires: 0');
            $xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($jobInvoice, 'Word2007');
            $xmlWriter->save("php://output");


        } else {
            getError('no db connection');
        }
    }

}

?>