import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() ChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() ChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  @Input() ChartType: ChartType = 'doughnut';
  @Input() leyenda: string = 'Proyecto Angular';

  constructor() { }

  ngOnInit(): void {
  }

}
