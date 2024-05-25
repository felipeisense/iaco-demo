import { ProgressCircle, Card, Title } from '@tremor/react';

export default function ProgressCircleXdHero  ({title, value}:any ){

    return(
        
        <div >
        <Card className="mx-auto max-w-sm">
          <div className="flex justify-start space-x-5 items-center">
            <ProgressCircle value={value} size="xl" />
            <div>
              <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                ({value}%)
              </p>
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {title}
              </p>
            </div>
          </div>
        </Card>
        </div>
        

    )
    
};