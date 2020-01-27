#
# make 			# compile all ts to js
# make clean	# remove js files
#

SRCS := $(wildcard *.ts)
JSFILES := $(SRCS:%.ts=%.js)

.PHONY = all clean run

all: ${JSFILES}

run:
	@echo "Running localhost page server..."
	@servePage .

%.js: %.ts
	tsc $<

clean:
	@echo "Cleaning up..."
	rm -f *.js