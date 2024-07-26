// pdf-worker.js
// import { GlobalWorkerOptions } from 'pdfjs-dist';
// GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js`;

import { GlobalWorkerOptions } from 'pdfjs-dist';
import worker from 'pdfjs-dist/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = worker;
