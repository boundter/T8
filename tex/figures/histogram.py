import numpy as np
import matplotlib.pyplot as plt

plt.rcParams["figure.figsize"] = [8, 5]
plt.rcParams['font.size'] = 20

mu, sigma = 0., 1.
data = np.random.normal(mu, sigma, 10000)
count, bins, ignored = plt.hist(data, 50, normed=True, linestyle='solid', color='white', label='Histogram')
plt.xlabel(r'$\Delta x$')
plt.ylabel(r'Wahrscheinlichkeit')
plt.plot(bins, 1/(sigma*np.sqrt(2*np.pi))*np.exp(-(bins - mu)**2/(2*sigma**2)),
         linewidth=2, linestyle='dashed', color='black', label='Normalverteilung')
plt.xlim(-4., 4.)
lgd = plt.legend(bbox_to_anchor=(0., 1.02, 1., .102), loc=3, ncol=2,
                mode="expand", borderaxespad=0., fontsize="13")
plt.tight_layout()
plt.savefig('histogram.pdf', bbox_extra_artists=(lgd,), dpi=300)
