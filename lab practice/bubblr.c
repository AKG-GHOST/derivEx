#include<stdio.h>
void bubblr(int a[],int n){
    int j,t ;
    if(n==1){
        return;
    }
    for(j=0;j<n-1;j++){
        if(a[j]>a[j+1]){
            t=a[j];
            a[j]=a[j+1];
            a[j+1] = t;
        }
    }
    bubblr(a,n-1);
}

int main(){
    int i,a[100],n;
    printf("enter n:");
    scanf("%d",&n);
    printf("enter elements:");
    for(i=0;i<n;i++){
        scanf("%d",&a[i]);
    }
    bubblr(a,n);
    printf("sorted elements:");
    for(i=0;i<n;i++){
        printf("%d ",a[i]);
    }
    return 0;
}   