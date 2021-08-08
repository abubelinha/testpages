## Comparing word/data sets:

- Experimental Comparison of Semantic Word Clouds. Lukas Barth, Stephen G. Kobourov, Sergey Pupyrev. https://www2.cs.arizona.edu/~kobourov/wordle2.pdf
- Upset: Interactive set visualization for more than three sets https://jku-vds-lab.at/tools/upset/ 
 Venn diagrams are a horrible way to visualize intersections of more than three or four sets. The figure below shows an example of a six-set venn diagram published in Nature that shows the relationship between the banana’s genome and the genome of five other species.
 ![Figure 1-1](https://jku-vds-lab.at/assets/images/projects/upset//banana.png "Figure 1-1")
 Now see it using UpSet:
 ![Figura 2](https://jku-vds-lab.at/assets/images/projects/upset//upsetr-banana.png "pasa rato por Figura 2")
 
  <img src="https://jku-vds-lab.at/assets/images/projects/upset//banana.png" width="50%"/><img src="https://jku-vds-lab.at/assets/images/projects/upset//upsetr-banana.png" width="50%" />

- N.Mahto 2018. Visualizing Intersecting Sets | Upset Chart in Python. https://medium.com/@narayanmahto/visualizing-intersecting-sets-upset-chart-in-python-cf72e4cad5b1

- https://www.kite.com/python/answers/how-to-find-the-intersection-of-multiple-sets-in-python

```Python
set1 = {1, 2}
set2 = {1, 3}
set3 = {1, 4}

intersection = set.intersection(set1, set2, set3)
# Find intersection of the three sets


print(intersection)
# OUTPUT:
# {1}
```
